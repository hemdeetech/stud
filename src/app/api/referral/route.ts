
'use server';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const referralSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  phoneNumber: z.string().min(10, "Please enter a valid phone number."),
  altPhoneNumber: z.string().optional(),
  email: z.string().email("Please enter a valid email address."),
  altEmail: z.string().email("Please enter a valid email address.").optional(),
  country: z.string().min(2, "Country is required."),
  state: z.string().min(2, "State is required."),
  city: z.string().min(2, "City is required."),
  accountNumber: z.string().min(10, "Please enter a valid account number."),
  accountName: z.string().min(2, "Account name is required."),
  bankName: z.string().min(2, "Bank name is required."),
});

async function sendConfirmationEmail(email: string, firstName: string, userId: string) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Email credentials for sending confirmation are not set.');
        // We don't want to block the user registration if the confirmation email fails
        // So we log the error and continue.
        return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
        from: `"HDTC Referral Program" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to the HDTC Referral Program!',
        html: `
            <h1>Welcome, ${firstName}!</h1>
            <p>Thank you for joining the Hem Dee Tech Company (HDTC) referral program. We are excited to have you on board!</p>
            <p>Your unique Referral ID is: <strong>${userId}</strong></p>
            <p>Please provide this ID to any new clients you refer to us. This is how we will track your referrals and ensure you get your commission.</p>
            <h2>How to Earn:</h2>
            <ol>
                <li>Find a potential client who needs our services.</li>
                <li>Tell them about HDTC and have them contact us for a project.</li>
                <li>Ensure they mention your name and provide your Referral ID when they contact us.</li>
                <li>Once the project is completed and paid for, you will receive your commission (20%-30% of the project value).</li>
            </ol>
            <p>If you have any questions, feel free to reply to this email or visit our website.</p>
            <p>Happy Earning!</p>
            <p><strong>The HDTC Team</strong></p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${email}`);
    } catch (error) {
        console.error(`Failed to send confirmation email to ${email}:`, error);
    }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = referralSchema.safeParse(body);

    if (!result.success) {
      console.error('Invalid referral form data:', result.error.flatten());
      return new NextResponse(JSON.stringify({ error: result.error.errors[0].message }), { status: 400 });
    }
    
    const referralData = result.data;
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      console.error('Google Apps Script URL is not set in environment variables.');
      return new NextResponse(JSON.stringify({ error: 'Server configuration error: Missing Google Script URL.' }), { status: 500 });
    }

    const payload = {
        action: 'register',
        timestamp: new Date().toISOString(),
        ...referralData,
        userIdPrefix: 'hdtc_rp',
    };
    
    // The Apps script needs to be configured to handle the 'action' and return a JSON object like { "status": "success", "userId": "hdtc_rp001" }
    // Or for duplicates: { "status": "duplicate", "message": "You have already registered." }
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      // Prevent Next.js from caching this dynamic request
      cache: 'no-store',
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from Apps Script:', response.status, errorText);
        throw new Error(`The script returned an error: ${errorText}`);
    }

    const scriptResponse = await response.json();
    
    // Handle duplicate entry response from the script
    if (scriptResponse.status === 'duplicate') {
        return new NextResponse(JSON.stringify({ error: scriptResponse.message || "This email or phone number is already registered." }), { status: 409 });
    }

    if (scriptResponse.status !== 'success' || !scriptResponse.userId) {
        console.error('Invalid JSON response from Apps Script:', scriptResponse);
        throw new Error('Failed to get a valid response from the registration script.');
    }

    // Send confirmation email with the unique ID from the script
    await sendConfirmationEmail(referralData.email, referralData.firstName, scriptResponse.userId);

    return NextResponse.json({ message: 'Registration successful! Please check your email for your unique Referral ID.' }, { status: 200 });

  } catch (error: any) {
    console.error('Error in referral registration:', error);
    // If the error is a 409 Conflict, it's our custom duplicate error.
    if (error.response?.status === 409) {
       return new NextResponse(JSON.stringify({ error: error.response.data.error }), { status: 409 });
    }
    const errorMessage = error.message || 'An unknown error occurred';
    return new NextResponse(JSON.stringify({ error: `Internal Server Error: ${errorMessage}` }), { status: 500 });
  }
}

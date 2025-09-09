
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
        console.warn('Email credentials for sending confirmation are not set. Skipping email.');
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
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    console.error('SERVER ERROR: GOOGLE_SCRIPT_URL environment variable is not set.');
    return new NextResponse(
      JSON.stringify({ error: 'Server configuration error. Please contact support.' }),
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const result = referralSchema.safeParse(body);

    if (!result.success) {
      console.error('Invalid referral form data:', result.error.flatten());
      return new NextResponse(JSON.stringify({ error: result.error.errors[0].message }), { status: 400 });
    }
    
    const referralData = result.data;

    const payload = {
        action: 'register',
        ...referralData,
        userIdPrefix: 'hdtc_rp',
    };
    
    console.log('Sending payload to Google Apps Script:', payload);
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow', // Important: This tells fetch to follow the redirect from Google
    });
    
    console.log(`Google Apps Script response status: ${response.status}`);
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from Google Apps Script:', response.status, errorText);
        try {
            const errorJson = JSON.parse(errorText);
            throw new Error(errorJson.message || `The registration service returned an error. Please try again later.`);
        } catch (e) {
            throw new Error(errorText || `The registration service returned an error. Please try again later.`);
        }
    }

    const scriptResponse = await response.json();
    console.log('Google Apps Script response body:', scriptResponse);
    
    if (scriptResponse.status === 'duplicate') {
        return new NextResponse(JSON.stringify({ error: scriptResponse.message || "This email or phone number is already registered." }), { status: 409 });
    }

    if (scriptResponse.status !== 'success' || !scriptResponse.userId) {
        console.error('Invalid success response from Google Apps Script:', scriptResponse);
        throw new Error('Failed to get a valid response from the registration service.');
    }

    await sendConfirmationEmail(referralData.email, referralData.firstName, scriptResponse.userId);

    return NextResponse.json({ message: 'Registration successful! Please check your email for your unique Referral ID.' }, { status: 200 });

  } catch (error: any) {
    console.error('Error in referral registration API:', error);
    const errorMessage = error.message || 'An unknown error occurred';
    return new NextResponse(JSON.stringify({ error: `Internal Server Error: ${errorMessage}` }), { status: 500 });
  }
}

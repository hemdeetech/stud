
'use server';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import axios from 'axios';
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
      return new NextResponse(result.error.errors[0].message, { status: 400 });
    }
    
    const referralData = result.data;
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      console.error('Google Apps Script URL is not set in environment variables.');
      return new NextResponse('Server configuration error: Missing Google Script URL.', { status: 500 });
    }

    const formData = new FormData();
    formData.append('timestamp', new Date().toISOString());
    formData.append('firstName', referralData.firstName);
    formData.append('lastName', referralData.lastName);
    formData.append('phoneNumber', referralData.phoneNumber);
    formData.append('altPhoneNumber', referralData.altPhoneNumber || 'N/A');
    formData.append('email', referralData.email);
    formData.append('altEmail', referralData.altEmail || 'N/A');
    formData.append('country', referralData.country);
    formData.append('state', referralData.state);
    formData.append('city', referralData.city);
    formData.append('bankName', referralData.bankName);
    formData.append('accountName', referralData.accountName);
    formData.append('accountNumber', referralData.accountNumber);
    
    // The Apps Script will handle generating the final sequential ID
    formData.append('userIdPrefix', 'hdtc_rp'); 

    // The Apps script needs to be configured to return a JSON object like { "status": "success", "userId": "hdtc_rp001" }
    const { data: scriptResponse } = await axios.post(scriptUrl, formData);

    if (scriptResponse.status !== 'success' || !scriptResponse.userId) {
        throw new Error('Failed to get a valid response from the registration script.');
    }

    // Send confirmation email with the unique ID from the script
    await sendConfirmationEmail(referralData.email, referralData.firstName, scriptResponse.userId);

    return NextResponse.json({ message: 'Registration successful! Please check your email for your unique Referral ID.' }, { status: 200 });

  } catch (error: any) {
    console.error('Error in referral registration:', error);
    const errorMessage = error.response?.data?.error || error.message || 'An unknown error occurred';
    return new NextResponse(`Internal Server Error: ${errorMessage}`, { status: 500 });
  }
}

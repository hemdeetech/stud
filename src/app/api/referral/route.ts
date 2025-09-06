
import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = referralSchema.safeParse(body);

    if (!result.success) {
      console.error('Invalid referral form data:', result.error.flatten());
      return new NextResponse(result.error.errors[0].message, { status: 400 });
    }
    
    const referralData = result.data;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Email credentials are not set in environment variables.');
        return new NextResponse('Server configuration error: Missing email credentials.', { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${referralData.firstName} ${referralData.lastName}" <${process.env.EMAIL_USER}>`,
      replyTo: referralData.email,
      to: process.env.EMAIL_USER,
      subject: `New Referral Program Registration: ${referralData.firstName} ${referralData.lastName}`,
      html: `
        <h1>New Referral Program Registration</h1>
        <h2>Personal Details</h2>
        <p><strong>First Name:</strong> ${referralData.firstName}</p>
        <p><strong>Last Name:</strong> ${referralData.lastName}</p>
        <p><strong>Phone Number:</strong> ${referralData.phoneNumber}</p>
        <p><strong>Alternative Phone Number:</strong> ${referralData.altPhoneNumber || 'N/A'}</p>
        <p><strong>Email Address:</strong> ${referralData.email}</p>
        <p><strong>Alternative Email:</strong> ${referralData.altEmail || 'N/A'}</p>
        <p><strong>Location:</strong> ${referralData.city}, ${referralData.state}, ${referralData.country}</p>
        <hr>
        <h2>Account Details</h2>
        <p><strong>Bank Name:</strong> ${referralData.bankName}</p>
        <p><strong>Account Name:</strong> ${referralData.accountName}</p>
        <p><strong>Account Number:</strong> ${referralData.accountNumber}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Registration successful! The details have been sent to our team.' }, { status: 200 });
  } catch (error) {
    console.error('Error in referral registration:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(`Internal Server Error: ${errorMessage}`, { status: 500 });
  }
}

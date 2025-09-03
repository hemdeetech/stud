
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Ensure environment variables are loaded and log for debugging
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Email credentials are not set in environment variables.');
        return new NextResponse('Server configuration error: Missing email credentials.', { status: 500 });
    }

    if (!name || !email || !phone || !subject || !message) {
      console.error('Missing required fields', body);
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // This should be your 16-digit App Password
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Send from your authenticated email
      replyTo: email, // Set the user's email as the reply-to address
      to: process.env.EMAIL_USER, // Your receiving email address
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully');
    return NextResponse.json({ message: 'Submission successful' }, { status: 200 });

  } catch (error) {
    console.error('Error in contact form submission:', error);
    // Provide a more specific error message if possible
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(`Internal Server Error: ${errorMessage}`, { status: 500 });
  }
}


import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// It's better to read env variables outside the handler
// to ensure they are available at server startup.
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Add server-side validation for better security
    const { name, email, phone, subject, message } = body;
    if (!name || !email || !phone || !subject || !message) {
      console.error('Validation Error: Missing required fields in contact form submission.', body);
      return new NextResponse(JSON.stringify({ error: 'Please fill out all required fields.' }), { status: 400 });
    }

    if (!emailUser || !emailPass) {
        console.error('Server Configuration Error: EMAIL_USER or EMAIL_PASS environment variables are not set.');
        // Return a generic error to the user for security
        return new NextResponse(JSON.stringify({ error: 'Server configuration error. Could not send email.' }), { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass, // This should be your 16-digit App Password from Google
      },
    });

    const mailOptions = {
      from: `"${name}" <${emailUser}>`, // Use your authenticated email as the sender
      replyTo: email, // This allows you to directly reply to the user's email
      to: emailUser, // Send the email to yourself
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

    // Use await and check for the response to ensure the email was sent
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);

    return NextResponse.json({ message: 'Submission successful! We will be in touch shortly.' }, { status: 200 });

  } catch (error) {
    // Log the detailed error on the server for debugging
    console.error('Error in contact form submission:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(JSON.stringify({ error: `Internal Server Error: ${errorMessage}` }), { status: 500 });
  }
}

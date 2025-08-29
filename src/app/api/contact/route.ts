
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Save the submission to a "contactSubmissions" collection.
    // You can view these messages for free in your Firebase Console.
    const submissionRef = adminDb.collection('contactSubmissions').doc();

    await submissionRef.set({
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: 'Submission successful' }, { status: 200 });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

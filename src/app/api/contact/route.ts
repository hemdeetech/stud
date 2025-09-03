
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received contact form body:', body);
    // These keys (name, email, etc.) must match what the form sends.
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      console.error('Missing required fields', body);
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // The collection will be created automatically if it doesn't exist.
    const submissionRef = adminDb.collection('contactSubmissions').doc();

    // The object keys here are what the fields will be named in Firestore.
    await submissionRef.set({
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
    });

    console.log('Successfully saved to Firestore');
    return NextResponse.json({ message: 'Submission successful' }, { status: 200 });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    // It's better to not expose internal errors to the client.
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

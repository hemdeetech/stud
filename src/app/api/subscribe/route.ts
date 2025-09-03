
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address.'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = subscribeSchema.safeParse(body);

    if (!result.success) {
      return new NextResponse(result.error.errors[0].message, { status: 400 });
    }
    
    const { email } = result.data;

    // Use the email address as the document ID to prevent duplicates
    const subscriberRef = adminDb.collection('newsletterSubscribers').doc(email);
    
    await subscriberRef.set({
      email,
      subscribedAt: new Date().toISOString(),
    }, { merge: true }); // Use merge:true to avoid overwriting if they already exist

    return NextResponse.json({ message: 'Subscription successful' }, { status: 200 });
  } catch (error) {
    console.error('Error in newsletter subscription:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

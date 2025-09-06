
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { z } from 'zod';

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

    // Use email as a unique identifier to prevent duplicate registrations
    const referralRef = adminDb.collection('referrals').doc(referralData.email);
    
    await referralRef.set({
      ...referralData,
      registeredAt: new Date().toISOString(),
    }, { merge: true }); // Use merge:true to avoid overwriting if they update details

    return NextResponse.json({ message: 'Registration successful' }, { status: 200 });
  } catch (error) {
    console.error('Error in referral registration:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

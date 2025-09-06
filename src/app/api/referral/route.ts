
'use server';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import axios from 'axios';

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
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      console.error('Google Apps Script URL is not set in environment variables.');
      return new NextResponse('Server configuration error: Missing Google Script URL.', { status: 500 });
    }

    // The order of fields here must exactly match the order of columns in your Google Sheet
    const formData = new FormData();
    formData.append('timestamp', new Date().toISOString());
    // The Apps Script will generate the final sequential ID
    formData.append('userId', 'hdtc_rp'); 
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
    

    await axios.post(scriptUrl, formData);

    return NextResponse.json({ message: 'Registration successful! Your details have been submitted.' }, { status: 200 });

  } catch (error: any) {
    console.error('Error in referral registration:', error);
    const errorMessage = error.response?.data?.error || error.message || 'An unknown error occurred';
    return new NextResponse(`Internal Server Error: ${errorMessage}`, { status: 500 });
  }
}

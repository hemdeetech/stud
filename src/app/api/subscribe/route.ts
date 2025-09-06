
import { NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address.'),
});

// Configure the Mailchimp client
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export async function POST(request: Request) {
  // Check for required environment variables
  if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_AUDIENCE_ID || !process.env.MAILCHIMP_SERVER_PREFIX) {
    console.error('Mailchimp environment variables are not set.');
    return new NextResponse(
      JSON.stringify({ error: 'Server configuration error: Missing Mailchimp credentials.' }), 
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const result = subscribeSchema.safeParse(body);

    if (!result.success) {
      return new NextResponse(result.error.errors[0].message, { status: 400 });
    }
    
    const { email } = result.data;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

    const response = await mailchimp.lists.addListMember(audienceId, {
      email_address: email,
      status: 'subscribed',
    });

    // Check for Mailchimp-specific errors (e.g., member already exists)
    if (response.status >= 400) {
      const errorTitle = (response as any).title;
      if (errorTitle === 'Member Exists') {
        return NextResponse.json({ message: 'You are already subscribed!' }, { status: 200 });
      }
      return new NextResponse(
        JSON.stringify({ error: `Mailchimp error: ${errorTitle}` }), 
        { status: 400 }
      );
    }
    
    return NextResponse.json({ message: 'Subscription successful!' }, { status: 200 });

  } catch (error: any) {
    console.error('Error in Mailchimp subscription:', error);
    
    // Handle cases where the user might already be subscribed
    if (error.response?.body?.title === 'Member Exists') {
        return NextResponse.json({ message: 'You are already subscribed!' }, { status: 200 });
    }

    const errorMessage = error.response?.body?.detail || 'An unknown error occurred.';
    return new NextResponse(
        JSON.stringify({ error: `Internal Server Error: ${errorMessage}` }), 
        { status: 500 }
    );
  }
}

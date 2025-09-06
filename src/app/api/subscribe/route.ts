
import { NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';
import { z } from 'zod';
import * as dotenv from 'dotenv';

dotenv.config();

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address.'),
});

export async function POST(request: Request) {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !serverPrefix || !audienceId) {
    console.error('CRITICAL: Mailchimp environment variables are not properly set.');
    return new NextResponse(
      JSON.stringify({ error: 'A server configuration error occurred. Please contact support.' }),
      { status: 500 }
    );
  }

  try {
    mailchimp.setConfig({
      apiKey: apiKey,
      server: serverPrefix,
    });

    const body = await request.json();
    const result = subscribeSchema.safeParse(body);

    if (!result.success) {
      console.error('Invalid email submission:', result.error.flatten());
      return new NextResponse(JSON.stringify({ error: result.error.errors[0].message }), { status: 400 });
    }
    
    const { email } = result.data;

    const response = await mailchimp.lists.addListMember(audienceId, {
      email_address: email,
      status: 'subscribed',
    });
    
    if (response.id) {
        return NextResponse.json({ message: 'Subscription successful! Thank you for joining.' }, { status: 200 });
    } else {
        console.error('Unexpected Mailchimp response:', response);
        return new NextResponse(JSON.stringify({ error: 'An unexpected error occurred with the subscription service.' }), { status: 500 });
    }

  } catch (error: any) {
    console.error('Mailchimp API Error:', JSON.stringify(error, null, 2));
    
    if (error.status === 400 && error.response?.body?.title === 'Member Exists') {
        return NextResponse.json({ message: 'This email is already subscribed!' }, { status: 200 });
    }

    const errorMessage = error.response?.body?.detail || 'An unknown error occurred while trying to subscribe.';
    return new NextResponse(
        JSON.stringify({ error: `Subscription failed: ${errorMessage}` }), 
        { status: error.status || 500 }
    );
  }
}

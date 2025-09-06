
import { NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address.'),
});

export async function POST(request: Request) {
  // 1. Validate environment variables at the beginning of the request.
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !serverPrefix || !audienceId) {
    console.error('CRITICAL: Mailchimp environment variables are not properly set.');
    // This is the specific error message the user is seeing.
    return new NextResponse(
      JSON.stringify({ error: 'A server configuration error occurred. Please contact support.' }),
      { status: 500 }
    );
  }

  // 2. Initialize Mailchimp client inside the handler.
  // This is more robust for serverless environments.
  try {
    mailchimp.setConfig({
      apiKey: apiKey,
      server: serverPrefix,
    });
  } catch (error) {
     console.error('Mailchimp configuration failed:', error);
     return new NextResponse(
      JSON.stringify({ error: 'Could not configure email service. Please contact support.' }),
      { status: 500 }
    );
  }


  // 3. Parse and validate the incoming request body.
  try {
    const body = await request.json();
    const result = subscribeSchema.safeParse(body);

    if (!result.success) {
      // Log the validation error for debugging.
      console.error('Invalid email submission:', result.error.flatten());
      return new NextResponse(JSON.stringify({ error: result.error.errors[0].message }), { status: 400 });
    }
    
    const { email } = result.data;

    // 4. Make the request to the Mailchimp API.
    const response = await mailchimp.lists.addListMember(audienceId, {
      email_address: email,
      status: 'subscribed',
    });
    
    // Mailchimp returns the member object on success. Check for a valid ID.
    if (response.id) {
        return NextResponse.json({ message: 'Subscription successful! Thank you for joining.' }, { status: 200 });
    } else {
        // This case handles unexpected responses that don't look like errors but aren't successes.
        console.error('Unexpected Mailchimp response:', response);
        return new NextResponse(JSON.stringify({ error: 'An unexpected error occurred with the subscription service.' }), { status: 500 });
    }

  } catch (error: any) {
    // 5. Catch and handle specific errors from the Mailchimp API.
    console.error('Mailchimp API Error:', JSON.stringify(error, null, 2));
    
    // Check if the error is a Mailchimp API error and has the "Member Exists" title.
    if (error.status === 400 && error.response?.body?.title === 'Member Exists') {
        return NextResponse.json({ message: 'This email is already subscribed!' }, { status: 200 });
    }

    // For any other error, return a generic message but log the specific one for debugging.
    const errorMessage = error.response?.body?.detail || 'An unknown error occurred while trying to subscribe.';
    return new NextResponse(
        JSON.stringify({ error: `Subscription failed: ${errorMessage}` }), 
        { status: 500 }
    );
  }
}

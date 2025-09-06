
import { NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address.'),
});

// Configure the Mailchimp client outside of the request handler
// This ensures it's configured only once when the server starts.
if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_SERVER_PREFIX) {
    mailchimp.setConfig({
        apiKey: process.env.MAILCHIMP_API_KEY,
        server: process.env.MAILCHIMP_SERVER_PREFIX,
    });
} else {
    // Log an error during server startup if credentials are not found.
    // This is more effective for debugging than checking inside the handler.
    console.error('CRITICAL: Mailchimp environment variables MAILCHIMP_API_KEY or MAILCHIMP_SERVER_PREFIX are not set.');
}

export async function POST(request: Request) {
  // Check for the audience ID right away.
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  if (!audienceId) {
    console.error('Server Configuration Error: MAILCHIMP_AUDIENCE_ID is not set.');
    return new NextResponse(
      JSON.stringify({ error: 'A server configuration error occurred. Please contact support.' }), 
      { status: 500 }
    );
  }
  
  // Also check that the API key and prefix were successfully set.
  if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER_PREFIX) {
    console.error('Server Configuration Error: Mailchimp API Key or Server Prefix are missing.');
    return new NextResponse(
        JSON.stringify({ error: 'A server configuration error occurred. Please contact support.' }),
        { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const result = subscribeSchema.safeParse(body);

    if (!result.success) {
      return new NextResponse(JSON.stringify({ error: result.error.errors[0].message }), { status: 400 });
    }
    
    const { email } = result.data;

    const response = await mailchimp.lists.addListMember(audienceId, {
      email_address: email,
      status: 'subscribed',
    });
    
    // Check for a successful response code from Mailchimp
    if (response.id) {
        return NextResponse.json({ message: 'Subscription successful!' }, { status: 200 });
    } else {
        // This case handles unexpected successful-looking responses without an ID
        console.error('Unexpected Mailchimp response:', response);
        return new NextResponse(JSON.stringify({ error: 'An unexpected error occurred with the subscription service.' }), { status: 500 });
    }

  } catch (error: any) {
    // Log the full error object for detailed debugging on the server
    console.error('Mailchimp API Error:', JSON.stringify(error, null, 2));
    
    // Check for the specific "Member Exists" error from Mailchimp's response
    if (error.status === 400 && error.response?.body?.title === 'Member Exists') {
        return NextResponse.json({ message: 'This email is already subscribed!' }, { status: 200 });
    }

    // For any other error, return a generic message but log the specific one.
    const errorMessage = error.response?.body?.detail || 'An unknown error occurred while trying to subscribe.';
    return new NextResponse(
        JSON.stringify({ error: `Subscription failed: ${errorMessage}` }), 
        { status: 500 }
    );
  }
}


import { NextResponse } from 'next/server';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = subscribeSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid email address provided.' }, { status: 400 });
    }

    const { email } = parsed.data;

    // In a real-world application, you would save the email to your database
    // and integrate with an email marketing service (e.g., SendGrid, Mailchimp).
    console.log(`New subscription from: ${email}`);

    // For now, we'll just simulate a successful subscription.
    return NextResponse.json({ message: `Successfully subscribed ${email}` }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}

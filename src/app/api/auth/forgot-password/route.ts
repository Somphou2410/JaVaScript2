import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  // Simulate sending email
  console.log(`Sending recovery email to: ${email}`);

  return NextResponse.json({ message: 'Recovery email sent.' }, { status: 200 });
}
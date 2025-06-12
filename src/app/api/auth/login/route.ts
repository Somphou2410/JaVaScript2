import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Replace with actual logic
  if (email === 'phing@gmail.com' && password === 'p12345678') {
    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
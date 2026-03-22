import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ status: 'webhook route live' });
}

export async function GET() {
  return NextResponse.json(
    { error: 'GET not allowed' },
    { status: 405 }
  );
}

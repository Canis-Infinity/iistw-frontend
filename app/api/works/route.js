import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) {
    return NextResponse.json({ error: 'Missing BASE_URL' }, { status: 500 });
  }

  const res = await fetch(`${baseUrl}/api/works`, { cache: 'no-store' });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch works' }, { status: 502 });
  }

  const data = await res.json();
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'no-store' },
  });
}

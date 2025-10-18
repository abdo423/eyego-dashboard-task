import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === 'candidate@example.com' && password === '123456') {
    const fakeToken = 'fake-jwt-token';
    const user = { id: 1, name: 'Candidate User', email: 'candidate@example.com' };

    const res = NextResponse.json({ token: fakeToken, user });

    res.cookies.set('token', fakeToken, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return res;
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}

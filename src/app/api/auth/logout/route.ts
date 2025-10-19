import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });

    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // This deletes the cookie
      path: '/',
    });

    return response;
  } catch (err) {
    return NextResponse.json({ message: 'Logout failed' }, { status: 500 });
  }
}

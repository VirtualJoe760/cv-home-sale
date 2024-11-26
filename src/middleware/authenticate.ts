// src/middleware/authenticate.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function authenticate(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const loginUrl = new URL('/auth/sign-in', request.url);

  if (!token) {
    console.log("No token found, redirecting to login.");
    return NextResponse.redirect(loginUrl);
  }

  // Safely handle userId and role values, falling back to empty strings if undefined
  const userId = typeof token.sub === 'string' ? token.sub : '';
  const userRole = typeof token.role === 'string' ? token.role : '';

  // Attach user information to request for use in API routes
  request.nextUrl.searchParams.set('userId', userId);
  request.nextUrl.searchParams.set('userRole', userRole);

  console.log("Authenticated user:", { userId, role: userRole });
  return NextResponse.next();
}

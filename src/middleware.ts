// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude specific routes from this middleware (e.g., public API routes)
  if (pathname === '/api/user/generateUsername' || pathname === '/api/user/saveUsername') {
    return NextResponse.next();
  }

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const loginUrl = new URL('/auth/sign-in', request.url);

  // Log token data
  console.log("Token Data:", token);

  // Redirect to login if the user is unauthenticated
  if (!token) {
    console.log("No token found, redirecting to login.");
    return NextResponse.redirect(loginUrl);
  }

  // Use `sub` as the user ID since `userId` is undefined
  const tokenUserId = token.sub; 
  const tokenRole = token.role;

  // Parse URL segments for userId and role
  const pathSegments = pathname.split('/');
  const urlUserId = pathSegments[1];
  const urlRole = pathSegments[2];

  // Log parsed URL values
  console.log("Parsed URL Info:", { urlUserId, urlRole });
  console.log("Token User Info:", { tokenUserId, tokenRole });

  // Check if userId and role in the URL match the token data
  if (urlUserId !== tokenUserId || urlRole !== tokenRole) {
    console.log("User mismatch - redirecting to 403.");
    return NextResponse.redirect(new URL('/403', request.url)); // Redirect if user is not authorized
  }

  // Allow the request if the user is authorized
  console.log("User authorized, proceeding with request.");
  return NextResponse.next();
}

export const config = {
  matcher: ['/:userId/:role/dashboard/:path*'], // Applies middleware only to dashboard paths with dynamic segments
};

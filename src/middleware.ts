// src/middleware.ts

import { NextResponse } from 'next/server'; // Ensure this import is correct
import type { NextRequest } from 'next/server';
import { authenticate } from './middleware/authenticate';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply authentication to all protected API routes
  if (pathname.startsWith('/api/user')) {
    return authenticate(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/user/:path*'], // Apply to all routes under /api/user
};

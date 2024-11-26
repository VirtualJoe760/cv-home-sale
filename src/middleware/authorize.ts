// src/middleware/authorize.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function authorize(request: NextRequest, requiredUserId: string, requiredRole?: string) {
  const userId = request.nextUrl.searchParams.get('userId');
  const userRole = request.nextUrl.searchParams.get('userRole');

  // Check if user ID and role match requirements
  if (requiredUserId && userId !== requiredUserId) {
    console.log("User ID mismatch - redirecting to 403.");
    return NextResponse.redirect(new URL('/403', request.url));
  }

  if (requiredRole && userRole !== requiredRole) {
    console.log("User role mismatch - redirecting to 403.");
    return NextResponse.redirect(new URL('/403', request.url));
  }

  console.log("User authorized, proceeding with request.");
  return NextResponse.next();
}

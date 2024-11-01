import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the 'theme' cookie exists, otherwise default to 'light'
  const theme = request.cookies.get('theme')?.value || 'light';

  // Create a response with the theme set as a custom header
  const response = NextResponse.next();
  response.headers.set('x-theme', theme);

  return response;
}

export const config = {
  matcher: '/', // Apply middleware to all routes or specify sub-paths as needed
};

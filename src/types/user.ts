// Define possible roles for users
export type UserRole = 'buyer' | 'seller' | 'agent' | 'admin' | 'guest';

// Extend the default user type from NextAuth
export interface User {
  id: string; // Add the user ID
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: UserRole; // Optionally include role
}

// Extend the default session type to include user ID
declare module 'next-auth' {
  interface Session {
    user: User; // Extend the session user type
  }
}

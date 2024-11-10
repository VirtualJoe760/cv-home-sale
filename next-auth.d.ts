// src/types/next-auth.d.ts
import NextAuth from 'next-auth';
import { UserRole } from './user'; // Adjust the import based on where your UserRole type is defined

declare module 'next-auth' {
  interface User {
    id: string;
    role: UserRole; // Add your custom properties here
  }

  interface Session {
    user: User; // Ensure user includes your extended User type
  }
}

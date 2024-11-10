// src/app/api/auth/authOptions.ts

import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/user';
import bcrypt from 'bcrypt';
import { Session } from 'next-auth';

// Define UserRole to match possible roles
export type UserRole = 'buyer' | 'seller' | 'agent' | 'admin';

// Define a custom user type that includes role
interface CustomUser {
  _id: string; // Assuming _id is the identifier from your User model
  name: string;
  email: string;
  password: string;
  role: UserRole; // Role as UserRole type
}

// Extend the session type to include the custom user properties
interface ExtendedSession extends Session {
  user: {
    id: string; // Custom user ID
    role: UserRole; // Custom role
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect(); // Ensure the database is connected

        if (!credentials?.email || !credentials?.password) {
          console.error('Email and password are required.');
          throw new Error('Email and password are required.');
        }

        const user = (await User.findOne({ email: credentials.email })) as CustomUser | null;

        if (!user) {
          console.error('No user found with this email:', credentials.email);
          throw new Error('No user found with this email');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          console.error('Invalid credentials for email:', credentials.email);
          throw new Error('Invalid credentials');
        }

        console.log('User logged in successfully:', user);

        return {
          id: user._id.toString(), // Ensure _id is treated as a string
          name: user.name,
          email: user.email,
          role: user.role, // Include user role as UserRole
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Set the user ID in the token
        token.role = user.role; // Include the user role in the token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // Attach user ID to session
        session.user.role = token.role as UserRole; // Attach user role to session
      }
      console.log('Session updated:', session); // Log the session data
      return session as ExtendedSession; // Cast session to ExtendedSession
    },
  },
  pages: {
    signIn: '/auth/sign-in',  // Redirect to your sign-in page
  },
  // Additional options can be added here
};

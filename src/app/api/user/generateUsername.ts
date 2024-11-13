// src/app/api/user/generateUsername.ts

import UserModel from '@/models/UserModel';
import dbConnect from '@/utils/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only accept GET requests for this route
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const email = req.query.email as string;

  try {
    await dbConnect();

    // Ensure email is a valid string
    if (!email || typeof email !== 'string') {
      console.error("Invalid email format: email should be a non-empty string");
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Find the user by email (no userId or ObjectId validation)
    console.log(`Finding user by email: ${email}`);
    const user = await UserModel.findOne({ email }, 'username');
    
    if (!user) {
      console.warn(`User not found for email: ${email}`);
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user already has a username
    if (user.username) {
      return res.status(200).json({ hasUsername: true, usernames: [user.username] });
    } else {
      // Indicate that the user has no username yet
      return res.status(200).json({ hasUsername: false, usernames: [] });
    }
  } catch (error) {
    console.error("Error in generateUsername API route:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
}

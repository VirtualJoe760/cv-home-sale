// src/app/api/user/saveUsername.ts

import UserModel from '@/models/UserModel';
import dbConnect from '@/utils/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, username } = req.body;

  try {
    await dbConnect();

    if (!email || !username) {
      return res.status(400).json({ message: 'Email and username are required' });
    }

    // Find the user by email and update with the new username
    const user = await UserModel.findOneAndUpdate(
      { email },
      { username },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: 'Username saved successfully', username: user.username });
  } catch (error) {
    console.error("Error saving username:", error);
    res.status(500).json({ message: 'Server error' });
  }
}

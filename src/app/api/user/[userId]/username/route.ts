import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import UserModel from '@/models/UserModel';
import generateUsernames from '@/utils/usernameGenerator';

export async function GET(req: NextRequest, context: { params: { userId: string } }) {
  // Await the context.params to comply with Next.js requirements
  const { userId } = await context.params;

  try {
    await dbConnect();

    // Check if the user exists and retrieve the username if available
    const user = await UserModel.findById(userId, 'username').lean();
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Generate a list of usernames whether or not the user already has a username
    const usernames = generateUsernames(5);

    // Return both the saved username (if it exists) and generated usernames
    return NextResponse.json({
      username: user.username || null, // Null if no username is saved
      usernames
    });
  } catch (error) {
    console.error("Error fetching username:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, context: { params: { userId: string } }) {
  // Await the context.params to comply with Next.js requirements
  const { userId } = await context.params;

  // Parse the request body to get the desired username
  const body = await req.json();
  const { username } = body;

  try {
    await dbConnect();

    // Check if the user exists in the database
    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Update the user's document with the new username and save the changes
    user.username = username;
    await user.save();

    return NextResponse.json({ username: user.username }, { status: 200 });
  } catch (error) {
    console.error("Error updating username:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

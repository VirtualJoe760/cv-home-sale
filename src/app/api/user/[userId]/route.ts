import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import UserModel from '@/models/UserModel';
import mongoose from 'mongoose';

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = await params; // Await params to avoid the Next.js error

  try {
    console.log("Received userId in API route:", userId);

    // Connect to the database
    await dbConnect();
    console.log("Database connected successfully.");

    // Verify and convert userId if it's a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.warn("Provided userId is not a valid ObjectId:", userId);
      return NextResponse.json({ message: "Invalid user ID format" }, { status: 400 });
    }

    // Attempt to find user by ObjectId
    console.log("Attempting to find user by ObjectId...");
    const user = await UserModel.findById(new mongoose.Types.ObjectId(userId), 'role name username email').lean();

    // Send response or 404 if user not found
    if (!user) {
      console.warn(`User with ObjectId ${userId} not found in the database.`);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("User found:", user);
    return NextResponse.json({ role: user.role, name: user.name, username: user.username, email: user.email }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import UserModel from '@/models/UserModel';
import mongoose from 'mongoose';

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid user ID format" }, { status: 400 });
    }

    const user = await UserModel.findById(new mongoose.Types.ObjectId(userId), '-password'); // Exclude sensitive info

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params;
  const data = await req.json();

  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid user ID format" }, { status: 400 });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(userId),
      { $set: data },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

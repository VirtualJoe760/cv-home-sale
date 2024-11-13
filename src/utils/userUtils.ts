import UserModel from '../models/UserModel';
import mongoose from 'mongoose';

// Function to update a user’s total karma
export const updateUserKarma = async (userId: mongoose.Types.ObjectId, points: number) => {
  const user = await UserModel.findById(userId);
  if (user) {
    user.karma = (user.karma || 0) + points;
    await user.save();
  }
};

// Function to check if a username is unique
export const isUsernameUnique = async (username: string) => {
  const user = await UserModel.findOne({ username });
  return !user;
};

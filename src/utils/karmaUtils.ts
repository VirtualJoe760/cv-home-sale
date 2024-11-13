import KarmaModel from '../models/KarmaModel';
import mongoose from 'mongoose';

// Function to add karma points for an action
export const addKarma = async (userId: mongoose.Types.ObjectId, community: string, points: number, action: string) => {
  const karmaEntry = new KarmaModel({
    userId,
    community,
    points,
    action,
    timestamp: new Date(),
  });
  await karmaEntry.save();
};

// Function to calculate total karma for a user
export const getTotalKarma = async (userId: mongoose.Types.ObjectId) => {
  const totalKarma = await KarmaModel.aggregate([
    { $match: { userId } },
    { $group: { _id: null, total: { $sum: '$points' } } },
  ]);
  return totalKarma[0]?.total || 0;
};

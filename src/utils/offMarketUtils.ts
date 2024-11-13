import OffMarketSubscriptionModel from '../models/OffMarketSubscriptionModel';
import mongoose from 'mongoose';

export const isUserOffMarket = async (userId: mongoose.Types.ObjectId) => {
  const subscription = await OffMarketSubscriptionModel.findOne({ userId, active: true });
  return !!subscription;
};

export const activateOffMarket = async (userId: mongoose.Types.ObjectId, durationInDays: number) => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + durationInDays);
  
  const newSubscription = new OffMarketSubscriptionModel({
    userId,
    active: true,
    startDate,
    endDate,
  });
  await newSubscription.save();
};

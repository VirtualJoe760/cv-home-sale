import { NextApiRequest, NextApiResponse } from 'next';
import { isUserOffMarket } from '@/utils/offMarketUtils';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  // Validate userId
  if (!userId || !mongoose.Types.ObjectId.isValid(userId as string)) {
    return res.status(400).json({ error: 'Invalid or missing User ID' });
  }

  try {
    // Check if the user has an active Off Market subscription
    const isOffMarket = await isUserOffMarket(new mongoose.Types.ObjectId(userId as string));
    res.status(200).json({ isOffMarket });
  } catch (error) {
    // Log the error if necessary and respond with an error message
    console.error(error); 
    res.status(500).json({ error: 'Failed to check Off Market status' });
  }
}

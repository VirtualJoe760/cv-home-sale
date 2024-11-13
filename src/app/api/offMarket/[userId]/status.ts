import { NextApiRequest, NextApiResponse } from 'next';
import { isUserOffMarket } from '@/utils/offMarketUtils';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId as string)) {
    return res.status(400).json({ error: 'Invalid or missing User ID' });
  }

  try {
    const isOffMarket = await isUserOffMarket(new mongoose.Types.ObjectId(userId as string));
    res.status(200).json({ isOffMarket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to check Off Market status' });
  }
}

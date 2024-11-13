import CommunityActivityModel from '../models/CommunityActivityModel';
import mongoose from 'mongoose';

// Function to add a new community activity post
export const addCommunityPost = async (userId: mongoose.Types.ObjectId, community: string, content: string) => {
  const newPost = new CommunityActivityModel({
    userId,
    community,
    content,
    karmaReceived: 0,
    timestamp: new Date(),
  });
  await newPost.save();
};

// Function to retrieve all posts for a specific community
export const getCommunityPosts = async (community: string) => {
  return await CommunityActivityModel.find({ community }).sort({ timestamp: -1 });
};

import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for Community Activity
export interface ICommunityActivity extends Document {
  userId: mongoose.Types.ObjectId;
  community: string;
  content: string;
  karmaReceived: number;
  timestamp: Date;
}

// Define the schema for Community Activity
const communityActivitySchema: Schema<ICommunityActivity> = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  community: { type: String, required: true },
  content: { type: String, required: true },
  karmaReceived: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
});

// Export the model
const CommunityActivityModel: Model<ICommunityActivity> =
  mongoose.models.CommunityActivity || mongoose.model<ICommunityActivity>('CommunityActivity', communityActivitySchema);

export default CommunityActivityModel;

import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for Karma
export interface IKarma extends Document {
  userId: mongoose.Types.ObjectId;
  community: string;
  points: number;
  action: string;
  timestamp: Date;
}

// Define the schema for Karma
const karmaSchema: Schema<IKarma> = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  community: { type: String, required: true },
  points: { type: Number, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Export the model
const KarmaModel: Model<IKarma> =
  mongoose.models.Karma || mongoose.model<IKarma>('Karma', karmaSchema);

export default KarmaModel;

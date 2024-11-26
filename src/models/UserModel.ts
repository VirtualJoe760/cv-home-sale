// src/models/UserModel.ts

import mongoose, { Schema, Document, Model } from 'mongoose';

export enum UserRole {
  Buyer = 'buyer',
  Seller = 'seller',
  Agent = 'agent',
  Admin = 'admin',
}

export interface IUser extends Document {
  name: string; // Real name
  username?: string; // Optional unique anonymized name for display
  email: string;
  password: string;
  role: UserRole;
  karma: number; // Total karma points
  communityKarma: Map<string, number>; // Track karma per community
  licenseNumber?: string; // For agents
  localAreaExpert: boolean;
  premiumStatus: boolean; // For private listings
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true }, // Real name
    username: { type: String, unique: true, sparse: true }, // Optional anonymized display name
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(UserRole) },
    karma: { type: Number, default: 0 },
    communityKarma: { type: Map, of: Number, default: {} },
    licenseNumber: { type: String },
    localAreaExpert: { type: Boolean, default: false },
    premiumStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default UserModel;

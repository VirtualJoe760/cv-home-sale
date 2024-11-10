import mongoose, { Schema, Document, Model } from 'mongoose';

// Define an enum for roles if you have specific ones
export enum UserRole {
  Buyer = 'buyer',
  Seller = 'seller',
  Agent = 'agent',
  Admin = 'admin',
}

// Extend the User interface with role and add other fields as needed
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole; // Use enum for type safety
}

// Define the User schema with validations
const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(UserRole) }, // Restrict to specific roles
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Ensure only one model is created by checking mongoose.models
const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default UserModel;

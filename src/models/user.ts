// src/models/user.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['buyer', 'seller', 'agent', 'admin'], default: 'buyer' },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

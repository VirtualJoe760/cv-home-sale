import mongoose from 'mongoose';

// Use an environment variable to get the MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI as string;

// Throw an error if MONGODB_URI is not defined
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

// Initialize global.mongoose if it doesn't exist
global.mongoose = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  // Return the cached connection if it exists
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  // If no connection exists, create one and cache it
  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      return mongoose.connection;
    });
  }

  // Wait for the promise to resolve and cache the connection
  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}

export default dbConnect;

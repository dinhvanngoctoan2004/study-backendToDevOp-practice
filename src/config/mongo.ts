import mongoose from 'mongoose';

let isConnected = false;

export const connectMongo = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('MONGO_URI is not defined in enviroment variables');
    return;
  }
  try {
    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 500,
      socketTimeoutMS: 4500,
    });
    isConnected = true;
    console.log('MongoDB Connected succcessfully');
  } catch (error) {
    isConnected = false;
    console.error('MongoDB connection error : ' + error);
    throw error;
  }
};

import mongoose from 'mongoose';
import { logger } from './logger.js';

export const connectMongo = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    logger.error('MONGO_URI is not defined in environment variables');
    throw new Error('MONGO_URI is not defined in environment variables');
  }
  try {
    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 500,
      socketTimeoutMS: 4500,
    });

    logger.info('MongoDB Connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error : ' + error);
    throw error;
  }
};

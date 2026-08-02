import mongoose from 'mongoose';

export const connectMongo = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('MONGO_URI is not defined in enviroment variables');
    throw new Error('MONGO_URI is not defined in enviroment variables');
  }
  try {
    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 500,
      socketTimeoutMS: 4500,
    });

    console.log('MongoDB Connected succcessfully');
  } catch (error) {
    console.error('MongoDB connection error : ' + error);
    throw error;
  }
};

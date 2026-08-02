import mongoose from 'mongoose';
let isConnected = false;
export const connectMongo = async () => {
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
        isConnected = true;
        console.log('MongoDB Connected succcessfully');
    }
    catch (error) {
        isConnected = false;
        console.error('MongoDB connection error : ' + error);
        throw error;
    }
};
//# sourceMappingURL=mongo.js.map
import dotenv from 'dotenv';
dotenv.config();
import express, {} from 'express';
import { connectMongo } from './config/mongo.js';
import mongoose from 'mongoose';
const app = express();
app.use(express.json());
app.get('/health', async (req, res) => {
    res.status(200).json({
        status: 'available',
        uptime: process.uptime(),
    });
});
app.get('/ready', async (req, res) => {
    const isDBConnected = mongoose.connection.readyState === 1;
    if (!isDBConnected) {
        return res.status(503).json({
            status: 'unavailable',
            database: 'disconnected',
        });
    }
    return res.status(200).json({
        status: 'ready',
        databse: 'connected',
    });
});
const bootstrap = async () => {
    try {
        await connectMongo();
        console.log('Database connected succcessfully');
        const PORT = process.env.PORT || 3000;
        app.listen(Number(PORT), () => {
            console.log(`[server]: Server is runing at http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error('Application failed to start: ' + err);
        process.exit(1);
    }
};
bootstrap();
//# sourceMappingURL=index.js.map
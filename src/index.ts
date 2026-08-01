import express, { type Request, type Response } from 'express';
import { connectMongo } from './config/mongo.js';
import mongoose from 'mongoose';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(Number(PORT), () => {
  console.log(`[server]: Server is runing at http://localhost:${PORT}`);
});

app.get('/health', async (req: Request, res: Response) => {
  try {
    await connectMongo();
  } catch (error) {
    console.error('Database connection failed during startup');
    process.exit(1);
  }
});

app.get('/ready', async (req: Request, res: Response) => {
  const idDBConnected = mongoose.connection.readyState === 1;
  if (!idDBConnected) {
    return res.status(503).json({
      status: 'unavailable',
      database: 'disconnected',
    });
  }
  return res.status(200).json({
    status: 'ready',
    databse: 'connected;',
  });
});

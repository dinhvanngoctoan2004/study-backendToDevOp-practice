import dotenv from 'dotenv';
dotenv.config();
import express, { type Request, type Response } from 'express';
import { connectMongo } from './config/mongo.js';
import mongoose from 'mongoose';
import authRouter from './routes/auth.routes.js';
import { error404, errorHandler } from './middlewares/errorHandler.js';
import morgan from 'morgan';
import { requestId } from './middlewares/requestId.js';
import { logger } from './config/logger.js';

const app = express();
app.use(requestId);
app.use(morgan(':method :url :status :res[content-length] - :response-time ms [req-id: :req[x-request-id]]'));
app.use(express.json());





app.use('/api/auth', authRouter);

app.get('/health', async (req: Request, res: Response) => {
  res.status(200).json({
    status: 'available',
    uptime: process.uptime(),
  });
});

app.get('/ready', async (req: Request, res: Response) => {
  const isDBConnected = mongoose.connection.readyState === 1;
  if (!isDBConnected) {
    return res.status(503).json({
      status: 'unavailable',
      database: 'disconnected',
    });
  }
  return res.status(200).json({
    status: 'ready',
    database: 'connected',
  });
});




app.use(error404);
app.use(errorHandler);


const bootstrap = async () => {
  try {
    await connectMongo();
    logger.info('Database connected successfully');
    const PORT = process.env.PORT || 3000;
    app.listen(Number(PORT), () => {
      logger.info(`[server]: Server is runing at http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error('Application failed to start: ' + err);
    process.exit(1);
  }
};

bootstrap();

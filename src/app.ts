import './config/env.js';
import express, { type Express, type Request, type Response } from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.routes.js';
import eventRouter from './routes/event.routes.js';
import { error404, errorHandler } from './middlewares/errorHandler.js';
import morgan from 'morgan';
import { requestId } from './middlewares/requestId.js';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'node:path';
import cookieParser from 'cookie-parser';

const app: Express = express();
app.use(requestId);
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms [req-id: :req[x-request-id]]',
  ),
);
app.use(express.json());
const swaggerDocument = YAML.load(path.join(process.cwd(), 'src/docs/swagger.yaml'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(cookieParser());

app.use('/api/auth', authRouter);

app.use('/api/events', eventRouter);

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

export default app;

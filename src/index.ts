import './config/env.js';
import { connectMongo } from './config/mongo.js';
import { logger } from './config/logger.js';
import app from './app.js';

const bootstrap = async () => {
  try {
    await connectMongo();
    logger.info('Database connected successfully');
    const PORT = process.env.PORT || 3000;
    app.listen(Number(PORT), () => {
      logger.info(`[server]: Server is runing at http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error(err, 'Application failed to start');
    process.exit(1);
  }
};

bootstrap();

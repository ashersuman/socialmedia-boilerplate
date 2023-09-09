import { Request, Response, NextFunction, Express } from 'express';
import logger from '../utils/logger';

export function configureLogging(app: Express) {
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Log the incoming request
    logger.info(`${req.method} ${req.url}`, {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });

    // Continue handling the request
    next();
  })

  // Todo: add other logging as needed

  // Error handling middleware to log errors
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`Error: ${error.message}`, {
      stack: error.stack,
    });

    // Continue handling the request
    next(error);
  });
}

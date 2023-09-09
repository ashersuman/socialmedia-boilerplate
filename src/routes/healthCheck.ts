import express, { Request, Response} from 'express';

const healthCheckRoute = express.Router();

healthCheckRoute.get('/', (req: Request, res: Response) => {
  // TODO : add health check logic
  const status = 'healthy'; // change this based on health check logic
  if(status === 'healthy') {
    res.status(200).json({ status: 'OK' });
  } else {
    res.status(500).json({ status: 'I am sick' });
  }
});

export { healthCheckRoute };
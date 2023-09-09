import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Define the log directory and filename pattern
const logDirectory = 'logs';
const logFileName = 'application-%DATE%.log';

// Configure winsto logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: `${logDirectory}/${logFileName}`,
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m', // Max log file size
      maxFiles: '30d', // Max logs files to keep (rotate daily for 30days)  
    })
  ],
});

export default logger;
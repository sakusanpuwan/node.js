import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Create log directory if it doesn't exist
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: 'info', // minimum level to log
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`
    ),
    winston.format.errors({ stack: true }), // include stack trace for errors
  ),
  transports: [
    // Console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // adds colors to console logs
        winston.format.simple()
      )
    }),

    // Application log file (info and above)
    new winston.transports.File({
      filename: path.join(logDir, 'application.log'),
      level: 'info',
      // If you only want info and not error -> 
      //       format: winston.format.combine(
      //   winston.format((info) => (info.level === 'error' ? false : info))(), // Exclude 'error' logs
      //   winston.format.printf(
      //     ({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`
      //   )
      // )
    }),

    // Error log file (errors only)
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error'
    })
  ]
});

export default logger;

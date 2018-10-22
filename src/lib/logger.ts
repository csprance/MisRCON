import * as fs from 'fs';
import * as winston from 'winston';
import { IRCONRequest } from '../redux/rcon';

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}
export const rconLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: './logs/rcon.log',
      level: 'info'
    })
  ]
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp()
  ),
  transports: [
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: './logs/app.log',
      level: 'info'
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.json(),
      level: 'rcon'
    })
  );
}

export const logRCONError = (req: IRCONRequest) => {
  const { password, ...rest } = req;
  rconLogger.log('info', `ERROR`, { ...rest });
};
export const logRCONResponse = (req: IRCONRequest) => {
  const { password, ...rest } = req;
  rconLogger.log('info', `SUCCESS`, { ...rest });
};

export default logger;

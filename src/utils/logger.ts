import { createLogger, format, LoggerOptions, transports } from 'winston';
import { Format } from 'logform';

const { combine, timestamp, colorize, printf } = format;

const myFormat: Format = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const loggingConfig: LoggerOptions = {
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    colorize(),
    myFormat
  ),
  transports: [
    new transports.Console()
  ]
};

export const logger = createLogger(loggingConfig);

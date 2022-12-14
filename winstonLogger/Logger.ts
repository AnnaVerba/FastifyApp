import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  transports: [new transports.File({
    filename: 'logs/info.log',
    format: format.combine(
      format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss.SSS' }),
      format.align(),
      format.printf(
        (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`,
      ),
    ),
  }),
  new transports.Console({
    format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss.SSS' }),
        format.align(),
        format.printf(
            (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`,
        ),
    ),
  }),]

});

export default logger;

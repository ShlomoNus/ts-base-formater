import winston from 'winston';

export const defaultFormat = winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

export type FormatType = typeof defaultFormat;

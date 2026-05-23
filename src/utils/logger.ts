import winston from 'winston';

/**
 * Log Format
 */

const logFormat = winston.format.printf(

    ({ level, message, timestamp }) => {

        return `${timestamp} [${level.toUpperCase()}] : ${message}`;
    }
);

/**
 * Framework Logger
 */

export const logger = winston.createLogger({

    level: 'info',

    format: winston.format.combine(

        winston.format.timestamp({

            format: 'YYYY-MM-DD HH:mm:ss'
        }),

        logFormat
    ),

    transports: [

        /**
         * Console Logs
         */

        new winston.transports.Console(),

        /**
         * File Logs
         */

        new winston.transports.File({

            filename: 'logs/framework.log'
        })
    ]
});
import path from 'path';
import { createLogger, format, transports, Logger } from 'winston';
const { combine, timestamp, printf, colorize } = format;

// Используем process.cwd() для получения текущей рабочей директории
export const ROOT_DIR: string = process.cwd();

export const FILES_DIR: string = path.join(ROOT_DIR, 'files');
export const ADRDESSES_TXT_DIR: string = path.join(FILES_DIR, 'addresses.txt');
export const PRIVATE_KEY_DIR: string = path.join(FILES_DIR, 'private_keys.txt');
export const RESULT_DIR: string = path.join(FILES_DIR, 'result.xlsx');

const LOGGER_FILE: string = path.join(FILES_DIR, 'application.log');

const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

interface CustomLogger extends Logger {
    success: (message: string) => void;
}

const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
        success: 5
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'white',
        http: 'magenta',
        debug: 'blue',
        success: 'green'
    }
};

format.colorize().addColors(customLevels.colors);

export const logger: CustomLogger = createLogger({
    levels: customLevels.levels,
    level: 'success',
    format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: LOGGER_FILE})
    ]
}) as CustomLogger;

logger.success = (message: string) => {
    logger.log('success', message);
};
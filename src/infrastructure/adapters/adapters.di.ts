import { container } from 'tsyringe';
import Logger from '../../core/ports/logger.port';
import { LogLevel, WinstonLogger } from './winston-logger/winston-logger.adapter';
import winstonLoggerConfig from './winston-logger/winston-logger.config';
import { BookRepository } from '../../core/ports/database.port';
import TypeORMBookRepository from './type-orm/book/book.repository';


container.register<Logger>("Logger", {
    useValue: new WinstonLogger(winstonLoggerConfig.logLovel as LogLevel)
}).register<BookRepository>(("BookRepository"), {
    useValue: new TypeORMBookRepository()
})
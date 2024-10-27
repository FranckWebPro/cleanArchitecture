import { z } from 'zod';
import notTypeSafeConfig from './type-orm.config';
import { debug } from 'winston';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import Book from './book/book.entity';

const ConfigSchema = z.object({
    host: z.string().min(1),
    port: z.coerce.number().min(1).max(65_535),
    user: z.string().min(1),
    password: z.string().min(1),
    database: z.string().min(1),
    dev: z.enum(["true", "false"]),
    debug: z.enum(["true", "false"]),   
});

const config = ConfigSchema.parse(notTypeSafeConfig);

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.host,
    port: config.port,
    username: config.user,
    password: config.password,
    database: config.database,
    entities: [Book],
    synchronize: config.dev === "true",
    logging: config.debug === "true",
    namingStrategy: new  SnakeNamingStrategy(),
})

export const isInitialized = async (): Promise<boolean> => {
    if(AppDataSource.isInitialized) return Promise.resolve(true);
    return AppDataSource.initialize().then(() => Promise.resolve(true));
}
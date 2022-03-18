import { registerAs } from '@nestjs/config'

export const config = registerAs('config', () => ({
    mongo: {
        dbName: process.env.MONGO_DB,
        user: process.env.MONGO_INITDB_ROOT_USERNAME,
        pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
        port: Number(process.env.MONGO_PORT),
        host: process.env.MONGO_HOST,
        connection: process.env.MONGO_CONNECTION
    }
}))

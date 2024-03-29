import { Module, Global } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { config } from '../config'

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigType<typeof config>) => {
                const { connection, user, pass, host, port, dbName } =
                    configService.mongo
                return {
                    uri: `${connection}://${host}:${port}`,
                    user,
                    pass,
                    dbName
                }
            },
            inject: [config.KEY]
        })
    ],
    providers: [],
    exports: []
})
export class DatabaseModule {}

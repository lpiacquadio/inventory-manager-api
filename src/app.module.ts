import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'

import { AuthModule } from './auth/auth.module'
import { BrandsModule } from './brands/brands.module'
import { CategoriesModule } from './categories/categories.module'
import { CustomersModule } from './customers/customers.module'
import { OrdersModule } from './orders/orders.module'
import { ProductsModule } from './products/products.module'
import { UsersModule } from './users/users.module'
import { DatabaseModule } from './database/database.module'
import { enviroments } from './enviroments'
import { config } from './config'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: enviroments[process.env.NODE_ENV] || '.env',
            load: [config],
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
                MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
                MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
                MONGO_DB: Joi.string().required(),
                MONGO_PORT: Joi.string().required(),
                MONGO_HOST: Joi.string().required(),
                MONGO_CONNECTION: Joi.string().required(),
                API_KEY: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                AMQP_URL: Joi.string().required()
            })
        }),
        AuthModule,
        BrandsModule,
        CategoriesModule,
        CustomersModule,
        OrdersModule,
        UsersModule,
        ProductsModule,
        DatabaseModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}

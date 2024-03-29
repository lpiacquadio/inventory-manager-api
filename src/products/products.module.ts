import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { Product, ProductSchema } from './product.entity'
import { UsersModule } from '../users/users.module'
import { ProxyModules } from 'src/common/proxy/proxy.module'

@Module({
    imports: [
        forwardRef(() => UsersModule),
        MongooseModule.forFeature([
            {
                name: Product.name,
                schema: ProductSchema
            }
        ]),
        ProxyModules
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService]
})
export class ProductsModule {}

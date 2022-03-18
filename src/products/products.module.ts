import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProductsController } from './controllers/products.controller'
import { ProductsService } from './services/products.service'
import { Product, ProductSchema } from './entities/product.entity'
import { BrandsController } from './controllers/brands.controller'
import { BrandsService } from './services/brands.service'
import { Brand, BrandSchema } from './entities/brand.entity'
import { CategoriesController } from './controllers/categories.controller'
import { CategoriesService } from './services/categories.service'
import { Category, CategorySchema } from './entities/category.entity'
import { OrdersController } from './controllers/orders.controller'
import { OrdersService } from './services/orders.service'
import { Order, OrderSchema } from './entities/order.entity'
import { UsersModule } from '../users/users.module'

@Module({
    imports: [
        forwardRef(() => UsersModule),
        MongooseModule.forFeature([
            {
                name: Product.name,
                schema: ProductSchema
            },
            {
                name: Category.name,
                schema: CategorySchema
            },
            {
                name: Brand.name,
                schema: BrandSchema
            },
            {
                name: Order.name,
                schema: OrderSchema
            }
        ])
    ],
    controllers: [
        ProductsController,
        CategoriesController,
        BrandsController,
        OrdersController
    ],
    providers: [
        ProductsService,
        BrandsService,
        CategoriesService,
        OrdersService
    ],
    exports: [OrdersService]
})
export class ProductsModule {}

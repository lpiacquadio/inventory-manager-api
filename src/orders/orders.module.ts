import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'
import { Order, OrderSchema } from './order.entity'
import { UsersModule } from 'src/users/users.module'
import { CustomersModule } from 'src/customers/customers.module'
import { ProductsModule } from 'src/products/products.module'
import { ProxyModules } from 'src/common/proxy/proxy.module'

@Module({
    imports: [
        forwardRef(() => UsersModule),
        forwardRef(() => CustomersModule),
        MongooseModule.forFeature([
            {
                name: Order.name,
                schema: OrderSchema
            }
        ]),
        ProductsModule,
        ProxyModules
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService]
})
export class OrdersModule {}

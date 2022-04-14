import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CustomerController } from './customers.controller'
import { CustomersService } from './customers.service'
import { Customer, CustomerSchema } from './customer.entity'
import { ProductsModule } from 'src/products/products.module'
import { OrdersModule } from 'src/orders/orders.module'
import { ProxyModules } from 'src/common/proxy/proxy.module'

@Module({
    imports: [
        forwardRef(() => ProductsModule),
        forwardRef(() => OrdersModule),
        MongooseModule.forFeature([
            {
                name: Customer.name,
                schema: CustomerSchema
            }
        ]),
        ProxyModules
    ],
    controllers: [CustomerController],
    providers: [CustomersService],
    exports: [CustomersService]
})
export class CustomersModule {}

import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CustomerController } from './controllers/customers.controller'
import { CustomersService } from './services/customers.service'
import { UsersController } from './controllers/users.controller'
import { UsersService } from './services/users.service'
import { User, UserSchema } from './entities/user.entity'
import { Customer, CustomerSchema } from './entities/customer.entity'
import { ProductsModule } from '../products/products.module'

@Module({
    imports: [
        forwardRef(() => ProductsModule),
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            },
            {
                name: Customer.name,
                schema: CustomerSchema
            }
        ])
    ],
    controllers: [CustomerController, UsersController],
    providers: [CustomersService, UsersService],
    exports: [UsersService]
})
export class UsersModule {}

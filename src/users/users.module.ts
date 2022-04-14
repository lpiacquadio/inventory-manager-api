import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User, UserSchema } from './user.entity'
import { ProductsModule } from '../products/products.module'
import { ProxyModules } from 'src/common/proxy/proxy.module'

@Module({
    imports: [
        forwardRef(() => ProductsModule),
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            }
        ]),
        ProxyModules
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}

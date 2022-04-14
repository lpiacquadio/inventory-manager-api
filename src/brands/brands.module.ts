import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { BrandsController } from './brands.controller'
import { BrandsService } from './brands.service'
import { Brand, BrandSchema } from './brand.entity'
import { UsersModule } from '../users/users.module'
import { ProxyModules } from 'src/common/proxy/proxy.module'

@Module({
    imports: [
        forwardRef(() => UsersModule),
        MongooseModule.forFeature([
            {
                name: Brand.name,
                schema: BrandSchema
            }
        ]),
        ProxyModules
    ],
    controllers: [BrandsController],
    providers: [BrandsService]
})
export class BrandsModule {}

import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'
import { Category, CategorySchema } from './category.entity'
import { UsersModule } from '../users/users.module'
import { ProxyModules } from 'src/common/proxy/proxy.module'

@Module({
    imports: [
        forwardRef(() => UsersModule),
        MongooseModule.forFeature([
            {
                name: Category.name,
                schema: CategorySchema
            }
        ]),
        ProxyModules
    ],
    controllers: [CategoriesController],
    providers: [CategoriesService]
})
export class CategoriesModule {}

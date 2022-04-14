import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude'
// import { Observable } from 'rxjs'

import { MongoIdPipe } from 'src/common/mongo-id.pipe'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { hasRoles } from 'src/auth/decorators/roles.decorator'
import { Category } from './category.entity'
import { Role } from 'src/auth/models/role.model'
// import { ClientProxyInventoryManager } from 'src/common/proxy/client-proxy'
// import { CategoryMSG } from 'src/common/constants'

@UseInterceptors(
    new SanitizeMongooseModelInterceptor({
        excludeMongooseId: false,
        excludeMongooseV: true
    })
)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(
        // private clientProxy: ClientProxyInventoryManager,
        private categoriesService: CategoriesService
    ) {}
    // private _clientProxyCategory = this.clientProxy.clientProxyCategories()

    @Get()
    @ApiOperation({ summary: 'List of categories' })
    @hasRoles(Role.ADMIN)
    findAll(): Promise<Category[]> {
        // return this._clientProxyCategory.send(CategoryMSG.FIND_ALL, {})
        return this.categoriesService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get category by id' })
    @hasRoles(Role.ADMIN)
    get(@Param('id', MongoIdPipe) id: string): Promise<Category> {
        // return this._clientProxyCategory.send(CategoryMSG.FIND_ONE, { id })
        return this.categoriesService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create a category' })
    @hasRoles(Role.ADMIN)
    create(@Body() payload: CreateCategoryDto): Promise<Category> {
        // return this._clientProxyCategory.send(CategoryMSG.CREATE, { payload })
        return this.categoriesService.create(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Edit a category by id' })
    @hasRoles(Role.ADMIN)
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateCategoryDto
    ): Promise<Category> {
        // return this._clientProxyCategory.send(CategoryMSG.UPDATE, {
        //     id,
        //     payload
        // })
        return this.categoriesService.update(id, payload)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a category by id' })
    @hasRoles(Role.ADMIN)
    remove(@Param('id', MongoIdPipe) id: string): Promise<boolean> {
        // return this._clientProxyCategory.send(CategoryMSG.DELETE, { id })
        return this.categoriesService.remove(id)
    }
}

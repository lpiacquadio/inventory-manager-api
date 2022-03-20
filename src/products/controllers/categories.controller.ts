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

import { MongoIdPipe } from 'src/common/mongo-id.pipe'
import { CategoriesService } from '../services/categories.service'
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { hasRoles } from 'src/auth/decorators/roles.decorator'
import { Role } from 'src/auth/models/role.model'

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
    constructor(private categoriesService: CategoriesService) {}

    @Get()
    @ApiOperation({ summary: 'List of categories' })
    @hasRoles(Role.ADMIN)
    findAll() {
        return this.categoriesService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get category by id' })
    @hasRoles(Role.ADMIN)
    get(@Param('id', MongoIdPipe) id: string) {
        return this.categoriesService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create a category' })
    @hasRoles(Role.ADMIN)
    create(@Body() payload: CreateCategoryDto) {
        return this.categoriesService.create(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Edit a category by id' })
    @hasRoles(Role.ADMIN)
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateCategoryDto
    ) {
        return this.categoriesService.update(id, payload)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a category by id' })
    @hasRoles(Role.ADMIN)
    remove(@Param('id', MongoIdPipe) id: string) {
        return this.categoriesService.remove(id)
    }
}

import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    ParseIntPipe
} from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { CategoriesService } from '../services/categories.service'
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto'

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Get()
    @ApiOperation({ summary: 'List of categories' })
    findAll() {
        return this.categoriesService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get category by id' })
    get(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create a category' })
    create(@Body() payload: CreateCategoryDto) {
        return this.categoriesService.create(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Edit a category by id' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateCategoryDto
    ) {
        return this.categoriesService.update(id, payload)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a category by id' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.remove(+id)
    }
}

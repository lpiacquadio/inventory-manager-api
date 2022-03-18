import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { MongoIdPipe } from '../../common/mongo-id.pipe'
import { BrandsService } from '../services/brands.service'
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto'

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
    constructor(private brandsService: BrandsService) {}

    @Get()
    @ApiOperation({ summary: 'List of brands' })
    findAll() {
        return this.brandsService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get brand by id' })
    get(@Param('id', MongoIdPipe) id: string) {
        return this.brandsService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create a brand' })
    create(@Body() payload: CreateBrandDto) {
        return this.brandsService.create(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Edit a brand by id' })
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateBrandDto
    ) {
        return this.brandsService.update(id, payload)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a brand by id' })
    remove(@Param('id', MongoIdPipe) id: string) {
        return this.brandsService.remove(id)
    }
}

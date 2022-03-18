import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Query
} from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { MongoIdPipe } from '../../common/mongo-id.pipe'
import { ProductsService } from '../services/products.service'
import {
    CreateProductDto,
    UpdateProductDto,
    FilterProductsDto
} from '../dtos/product.dto'

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    @ApiOperation({ summary: 'List of products' })
    getProducts(@Query() params: FilterProductsDto) {
        return this.productsService.findAll(params)
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get product by id' })
    getOne(@Param('id', MongoIdPipe) id: string) {
        return this.productsService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create a product' })
    create(@Body() payload: CreateProductDto) {
        return this.productsService.create(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Edit a product by id' })
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateProductDto
    ) {
        return this.productsService.update(id, payload)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product by id' })
    delete(@Param('id', MongoIdPipe) id: string) {
        return this.productsService.remove(id)
    }
}

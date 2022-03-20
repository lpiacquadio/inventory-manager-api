import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Query,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude'

import { MongoIdPipe } from 'src/common/mongo-id.pipe'
import { ProductsService } from '../services/products.service'
import {
    CreateProductDto,
    UpdateProductDto,
    FilterProductsDto
} from '../dtos/product.dto'
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
@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    @ApiOperation({ summary: 'List of products' })
    @hasRoles(Role.ADMIN)
    getProducts(@Query() params: FilterProductsDto) {
        return this.productsService.findAll(params)
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get product by id' })
    @hasRoles(Role.ADMIN)
    getOne(@Param('id', MongoIdPipe) id: string) {
        return this.productsService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create a product' })
    @hasRoles(Role.ADMIN)
    create(@Body() payload: CreateProductDto) {
        return this.productsService.create(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Edit a product by id' })
    @hasRoles(Role.ADMIN)
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateProductDto
    ) {
        return this.productsService.update(id, payload)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product by id' })
    @hasRoles(Role.ADMIN)
    delete(@Param('id', MongoIdPipe) id: string) {
        return this.productsService.remove(id)
    }
}

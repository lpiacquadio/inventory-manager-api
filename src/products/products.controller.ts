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
// import { Observable } from 'rxjs'

import { MongoIdPipe } from 'src/common/mongo-id.pipe'
import { ProductsService } from './products.service'
import {
    CreateProductDto,
    UpdateProductDto,
    FilterProductsDto
} from './product.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { hasRoles } from 'src/auth/decorators/roles.decorator'
import { Product } from './product.entity'
import { Role } from 'src/auth/models/role.model'
// import { ClientProxyInventoryManager } from 'src/common/proxy/client-proxy'
// import { ProductMSG } from 'src/common/constants'

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
    constructor(
        // private clientProxy: ClientProxyInventoryManager,
        private productsService: ProductsService
    ) {}
    // private _clientProxyProduct = this.clientProxy.clientProxyProducts()

    @Get()
    @ApiOperation({ summary: 'List of products' })
    @hasRoles(Role.ADMIN)
    getProducts(@Query() params: FilterProductsDto): Promise<Product[]> {
        // return this._clientProxyProduct.send(ProductMSG.FIND_ALL, {})
        return this.productsService.findAll(params)
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get product by id' })
    @hasRoles(Role.ADMIN)
    getOne(@Param('id', MongoIdPipe) id: string): Promise<Product> {
        // return this._clientProxyProduct.send(ProductMSG.FIND_ONE, { id })
        return this.productsService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create a product' })
    @hasRoles(Role.ADMIN)
    create(@Body() payload: CreateProductDto): Promise<Product> {
        // return this._clientProxyProduct.send(ProductMSG.CREATE, { payload })
        return this.productsService.create(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Edit a product by id' })
    @hasRoles(Role.ADMIN)
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateProductDto
    ): Promise<Product> {
        // return this._clientProxyProduct.send(ProductMSG.UPDATE, { id, payload })
        return this.productsService.update(id, payload)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product by id' })
    @hasRoles(Role.ADMIN)
    delete(@Param('id', MongoIdPipe) id: string): Promise<boolean> {
        // return this._clientProxyProduct.send(ProductMSG.DELETE, { id })
        return this.productsService.remove(id)
    }
}

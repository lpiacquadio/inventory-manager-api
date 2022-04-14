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
import { BrandsService } from './brands.service'
import { CreateBrandDto, UpdateBrandDto } from './brand.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { hasRoles } from 'src/auth/decorators/roles.decorator'
import { Brand } from './brand.entity'
import { Role } from 'src/auth/models/role.model'
// import { ClientProxyInventoryManager } from 'src/common/proxy/client-proxy'
// import { BrandMSG } from 'src/common/constants'

@UseInterceptors(
    new SanitizeMongooseModelInterceptor({
        excludeMongooseId: false,
        excludeMongooseV: true
    })
)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('brands')
@Controller('brands')
export class BrandsController {
    constructor(
        // private clientProxy: ClientProxyInventoryManager,
        private brandsService: BrandsService
    ) {}
    // private _clientProxyBrand = this.clientProxy.clientProxyBrands()

    @Get()
    @ApiOperation({ summary: 'List of brands' })
    @hasRoles(Role.ADMIN)
    findAll(): Promise<Brand[]> {
        // return this._clientProxyBrand.send(BrandMSG.FIND_ALL, {})
        return this.brandsService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get brand by id' })
    @hasRoles(Role.ADMIN)
    get(@Param('id', MongoIdPipe) id: string): Promise<Brand> {
        // return this._clientProxyBrand.send(BrandMSG.FIND_ONE, { id })
        return this.brandsService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create a brand' })
    @hasRoles(Role.ADMIN)
    create(@Body() payload: CreateBrandDto): Promise<Brand> {
        // return this._clientProxyBrand.send(BrandMSG.CREATE, { payload })
        return this.brandsService.create(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Edit a brand by id' })
    @hasRoles(Role.ADMIN)
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateBrandDto
    ): Promise<Brand> {
        // return this._clientProxyBrand.send(BrandMSG.UPDATE, { id, payload })
        return this.brandsService.update(id, payload)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a brand by id' })
    @hasRoles(Role.ADMIN)
    remove(@Param('id', MongoIdPipe) id: string): Promise<boolean> {
        // return this._clientProxyBrand.send(BrandMSG.DELETE, { id })
        return this.brandsService.remove(id)
    }
}

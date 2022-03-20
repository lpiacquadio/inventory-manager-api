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
import { BrandsService } from '../services/brands.service'
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto'
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
@ApiTags('brands')
@Controller('brands')
export class BrandsController {
    constructor(private brandsService: BrandsService) {}

    @Get()
    @ApiOperation({ summary: 'List of brands' })
    @hasRoles(Role.ADMIN)
    findAll() {
        return this.brandsService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get brand by id' })
    @hasRoles(Role.ADMIN)
    get(@Param('id', MongoIdPipe) id: string) {
        return this.brandsService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create a brand' })
    @hasRoles(Role.ADMIN)
    create(@Body() payload: CreateBrandDto) {
        return this.brandsService.create(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Edit a brand by id' })
    @hasRoles(Role.ADMIN)
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateBrandDto
    ) {
        return this.brandsService.update(id, payload)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a brand by id' })
    @hasRoles(Role.ADMIN)
    remove(@Param('id', MongoIdPipe) id: string) {
        return this.brandsService.remove(id)
    }
}

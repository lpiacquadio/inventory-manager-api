import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude'

import { MongoIdPipe } from 'src/common/mongo-id.pipe'
import { OrdersService } from '../services/orders.service'
import { CreateOrderDto } from '../dtos/order.dto'
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
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Get(':id')
    @ApiOperation({ summary: 'Get order by id' })
    @hasRoles(Role.ADMIN)
    get(@Param('id', MongoIdPipe) id: string) {
        return this.ordersService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create an order' })
    @hasRoles(Role.ADMIN)
    create(@Body() payload: CreateOrderDto) {
        return this.ordersService.create(payload)
    }
}

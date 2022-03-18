import { Controller, Get, Param, Post, Body } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { MongoIdPipe } from '../../common/mongo-id.pipe'
import { OrdersService } from '../services/orders.service'
import { CreateOrderDto } from '../dtos/order.dto'

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Get(':id')
    @ApiOperation({ summary: 'Get order by id' })
    get(@Param('id', MongoIdPipe) id: string) {
        return this.ordersService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create an order' })
    create(@Body() payload: CreateOrderDto) {
        return this.ordersService.create(payload)
    }
}

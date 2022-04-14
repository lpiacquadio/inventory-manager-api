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
// import { Observable } from 'rxjs'

import { MongoIdPipe } from 'src/common/mongo-id.pipe'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './order.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { hasRoles } from 'src/auth/decorators/roles.decorator'
import { Order } from './order.entity'
import { Role } from 'src/auth/models/role.model'
// import { ClientProxyInventoryManager } from 'src/common/proxy/client-proxy'
// import { OrderMSG } from 'src/common/constants'

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
    constructor(
        // private clientProxy: ClientProxyInventoryManager,
        private ordersService: OrdersService
    ) {}
    // private _clientProxyOrder = this.clientProxy.clientProxyOrders()

    @Get(':id')
    @ApiOperation({ summary: 'Get order by id' })
    @hasRoles(Role.ADMIN)
    get(@Param('id', MongoIdPipe) id: string): Promise<Order> {
        // return this._clientProxyOrder.send(OrderMSG.FIND_ONE, { id })
        return this.ordersService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create an order' })
    @hasRoles(Role.ADMIN)
    create(@Body() payload: CreateOrderDto): Promise<Order> {
        // return this._clientProxyOrder.send(OrderMSG.CREATE, { payload })
        return this.ordersService.create(payload)
    }
}

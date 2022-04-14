import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Inject,
    forwardRef,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude'
// import { Observable } from 'rxjs'

import { MongoIdPipe } from 'src/common/mongo-id.pipe'
import { CustomersService } from './customers.service'
import { OrdersService } from 'src/orders/orders.service'
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { hasRoles } from 'src/auth/decorators/roles.decorator'
import { Customer } from './customer.entity'
import { Order } from 'src/orders/order.entity'
import { Role } from 'src/auth/models/role.model'
// import { ClientProxyInventoryManager } from 'src/common/proxy/client-proxy'
// import { CustomerMSG, OrderMSG } from 'src/common/constants'

@UseInterceptors(
    new SanitizeMongooseModelInterceptor({
        excludeMongooseId: false,
        excludeMongooseV: true
    })
)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('customers')
@Controller('customers')
export class CustomerController {
    constructor(
        // private clientProxy: ClientProxyInventoryManager,
        private customersService: CustomersService,
        @Inject(forwardRef(() => OrdersService))
        private ordersService: OrdersService
    ) {}
    // private _clientProxyCustomer = this.clientProxy.clientProxyCustomers()
    // private _clientProxyOrder = this.clientProxy.clientProxyOrders()

    @Get()
    @ApiOperation({ summary: 'List of customers' })
    @hasRoles(Role.ADMIN)
    findAll(): Promise<Customer[]> {
        // return this._clientProxyCustomer.send(CustomerMSG.FIND_ALL, {})
        return this.customersService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get customer by id' })
    @hasRoles(Role.ADMIN)
    get(@Param('id', MongoIdPipe) id: string): Promise<Customer> {
        // return this._clientProxyCustomer.send(CustomerMSG.FIND_ONE, { id })
        return this.customersService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create a customer' })
    @hasRoles(Role.ADMIN)
    create(@Body() payload: CreateCustomerDto): Promise<Customer> {
        // return this._clientProxyCustomer.send(CustomerMSG.CREATE, { payload })
        return this.customersService.create(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Edit a customer by id' })
    @hasRoles(Role.ADMIN)
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateCustomerDto
    ): Promise<Customer> {
        // return this._clientProxyCustomer.send(CustomerMSG.UPDATE, {
        //     id,
        //     payload
        // })
        return this.customersService.update(id, payload)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a customer by id' })
    @hasRoles(Role.ADMIN)
    remove(@Param('id', MongoIdPipe) id: string) {
        // return this._clientProxyCustomer.send(CustomerMSG.DELETE, { id })
        return this.customersService.remove(id)
    }

    @Get(':id/orders')
    @ApiOperation({ summary: 'Get orders by user id' })
    @hasRoles(Role.ADMIN)
    findAllOrders(@Param('id', MongoIdPipe) id: string): Promise<Order[]> {
        // return this._clientProxyOrder.send(OrderMSG.FIND_ALL, { id })
        return this.ordersService.findAll(id)
    }
}

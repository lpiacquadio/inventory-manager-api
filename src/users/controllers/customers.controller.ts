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

import { MongoIdPipe } from 'src/common/mongo-id.pipe'
import { CustomersService } from '../services/customers.service'
import { OrdersService } from 'src/products/services/orders.service'
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto'
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
@ApiTags('customers')
@Controller('customers')
export class CustomerController {
    constructor(
        private customersService: CustomersService,
        @Inject(forwardRef(() => OrdersService))
        private ordersService: OrdersService
    ) {}

    @Get()
    @ApiOperation({ summary: 'List of customers' })
    @hasRoles(Role.ADMIN)
    findAll() {
        return this.customersService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get customer by id' })
    @hasRoles(Role.ADMIN)
    get(@Param('id', MongoIdPipe) id: string) {
        return this.customersService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create a customer' })
    @hasRoles(Role.ADMIN)
    create(@Body() payload: CreateCustomerDto) {
        return this.customersService.create(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Edit a customer by id' })
    @hasRoles(Role.ADMIN)
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateCustomerDto
    ) {
        return this.customersService.update(id, payload)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a customer by id' })
    @hasRoles(Role.ADMIN)
    remove(@Param('id', MongoIdPipe) id: string) {
        return this.customersService.remove(id)
    }

    @Get(':id/orders')
    @ApiOperation({ summary: 'Get orders by user id' })
    @hasRoles(Role.ADMIN)
    findAllOrders(@Param('id', MongoIdPipe) id: string) {
        return this.ordersService.findAll(id)
    }
}

import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { MongoIdPipe } from '../../common/mongo-id.pipe'
import { CustomersService } from '../services/customers.service'
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto'

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
    constructor(private customersService: CustomersService) {}

    @Get()
    @ApiOperation({ summary: 'List of customers' })
    findAll() {
        return this.customersService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get customer by id' })
    get(@Param('id', MongoIdPipe) id: string) {
        return this.customersService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create a customer' })
    create(@Body() payload: CreateCustomerDto) {
        return this.customersService.create(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Edit a customer by id' })
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateCustomerDto
    ) {
        return this.customersService.update(id, payload)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a customer by id' })
    remove(@Param('id', MongoIdPipe) id: string) {
        return this.customersService.remove(id)
    }
}

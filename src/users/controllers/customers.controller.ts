import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    ParseIntPipe
} from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

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
    get(@Param('id', ParseIntPipe) id: number) {
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
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateCustomerDto
    ) {
        return this.customersService.update(id, payload)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a customer by id' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.customersService.remove(+id)
    }
}

import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Inject,
    forwardRef
} from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { MongoIdPipe } from '../../common/mongo-id.pipe'
import { UsersService } from '../services/users.service'
import { OrdersService } from '../../products/services/orders.service'
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto'

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        @Inject(forwardRef(() => OrdersService))
        private ordersService: OrdersService,
        private usersService: UsersService
    ) {}

    @Get()
    @ApiOperation({ summary: 'List of users' })
    findAll() {
        return this.usersService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by id' })
    get(@Param('id', MongoIdPipe) id: string) {
        return this.usersService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create an user' })
    create(@Body() payload: CreateUserDto) {
        return this.usersService.create(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Edit an user by id' })
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateUserDto
    ) {
        return this.usersService.update(id, payload)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an user by id' })
    remove(@Param('id', MongoIdPipe) id: string) {
        return this.usersService.remove(id)
    }

    @Get(':id/orders')
    @ApiOperation({ summary: 'Get orders by user id' })
    findAllOrders(@Param('id', MongoIdPipe) id: string) {
        return this.ordersService.findAll(id)
    }
}

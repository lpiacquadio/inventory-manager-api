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

import { UsersService } from '../services/users.service'
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto'

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'List of users' })
    findAll() {
        return this.usersService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by id' })
    get(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id)
    }

    @Get(':id/orders')
    @ApiOperation({ summary: 'Get orders by user id' })
    getOrders(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getOrderByUser(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create an user' })
    create(@Body() payload: CreateUserDto) {
        return this.usersService.create(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Edit an user by id' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateUserDto
    ) {
        return this.usersService.update(id, payload)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an user by id' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(+id)
    }
}

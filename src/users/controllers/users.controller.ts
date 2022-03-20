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
import { UsersService } from '../services/users.service'
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto'
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard'
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
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'List of users' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @hasRoles(Role.ADMIN)
    findAll() {
        return this.usersService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by id' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @hasRoles(Role.ADMIN)
    get(@Param('id', MongoIdPipe) id: string) {
        return this.usersService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create an user' })
    @UseGuards(ApiKeyGuard)
    @hasRoles(Role.ADMIN)
    create(@Body() payload: CreateUserDto) {
        return this.usersService.create(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Edit an user by id' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @hasRoles(Role.ADMIN)
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateUserDto
    ) {
        return this.usersService.update(id, payload)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an user by id' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @hasRoles(Role.ADMIN)
    remove(@Param('id', MongoIdPipe) id: string) {
        return this.usersService.remove(id)
    }
}

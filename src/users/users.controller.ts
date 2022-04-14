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
// import { Observable } from 'rxjs'

import { MongoIdPipe } from 'src/common/mongo-id.pipe'
import { UsersService } from './users.service'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { hasRoles } from 'src/auth/decorators/roles.decorator'
import { User } from './user.entity'
import { Role } from 'src/auth/models/role.model'
// import { ClientProxyInventoryManager } from 'src/common/proxy/client-proxy'
// import { UserMSG } from 'src/common/constants'

@UseInterceptors(
    new SanitizeMongooseModelInterceptor({
        excludeMongooseId: false,
        excludeMongooseV: true
    })
)
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        // private clientProxy: ClientProxyInventoryManager,
        private usersService: UsersService
    ) {}
    // private _clientProxyUser = this.clientProxy.clientProxyUsers()

    @Get()
    @ApiOperation({ summary: 'List of users' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @hasRoles(Role.ADMIN)
    findAll(): Promise<User[]> {
        // return this._clientProxyUser.send(UserMSG.FIND_ALL, {})
        return this.usersService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by id' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @hasRoles(Role.ADMIN)
    get(@Param('id', MongoIdPipe) id: string): Promise<User> {
        // return this._clientProxyUser.send(UserMSG.FIND_ONE, { id })
        return this.usersService.findOne(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create an user' })
    @UseGuards(ApiKeyGuard)
    @hasRoles(Role.ADMIN)
    create(@Body() payload: CreateUserDto): Promise<User> {
        // return this._clientProxyUser.send(UserMSG.CREATE, { payload })
        return this.usersService.create(payload)
    }

    @Put(':id')
    @ApiOperation({ summary: 'Edit an user by id' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @hasRoles(Role.ADMIN)
    update(
        @Param('id', MongoIdPipe) id: string,
        @Body() payload: UpdateUserDto
    ): Promise<User> {
        // return this._clientProxyUser.send(UserMSG.UPDATE, { id, payload })
        return this.usersService.update(id, payload)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an user by id' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @hasRoles(Role.ADMIN)
    remove(@Param('id', MongoIdPipe) id: string): Promise<boolean> {
        // return this._clientProxyUser.send(UserMSG.DELETE, { id })
        return this.usersService.remove(id)
    }
}

import {
    Controller,
    Post,
    Req,
    UseGuards,
    UseInterceptors
} from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'

import { AuthService } from '../services/auth.service'
import { User } from 'src/users/entities/user.entity'
import { LOCAL_STRATEGY } from '../strategies/local.strategy'

@UseInterceptors(
    new SanitizeMongooseModelInterceptor({
        excludeMongooseId: false,
        excludeMongooseV: true
    })
)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Login' })
    @UseGuards(AuthGuard(LOCAL_STRATEGY))
    login(@Req() req: Request) {
        const user = req.user as User
        return this.authService.generateJwt(user)
    }
}

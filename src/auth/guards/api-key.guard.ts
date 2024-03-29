import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    Inject
} from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { Request } from 'express'

import { config } from 'src/config'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject(config.KEY) private configService: ConfigType<typeof config>
    ) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler())
        if (isPublic) {
            return true
        }
        const request = context.switchToHttp().getRequest<Request>()
        const authHeader = request.header('Authorization')
        const isAuth = authHeader === this.configService.apiKey
        if (!isAuth) {
            throw new UnauthorizedException('Not allowed')
        }
        return true
    }
}

import { Module } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { config } from 'src/config'
import { UsersModule } from '../users/users.module'
import { AuthController } from './controllers/auth.controller'
import { AuthService } from './services/auth.service'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigType<typeof config>) => ({
                secret: configService.jwtSecret,
                signOptions: { expiresIn: '10d' }
            }),
            inject: [config.KEY]
        }),
        UsersModule
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}

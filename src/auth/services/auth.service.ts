import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { UsersService } from 'src/users/services/users.service'
import { User } from 'src/users/entities/user.entity'
import { PayloadToken } from '../models/token.model'

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email)
        const isMatch =
            user &&
            user.password &&
            (await bcrypt.compare(password, user.password))
        if (isMatch) {
            return user
        }
        return null
    }

    generateJwt(user: User) {
        const payload: PayloadToken = { role: user.role, sub: user._id }
        return {
            accessToken: this.jwtService.sign(payload),
            user
        }
    }
}

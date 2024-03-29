import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { User } from './user.entity'
import { CreateUserDto, UpdateUserDto } from './user.dto'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    findAll(): Promise<User[]> {
        return this.userModel.find().exec()
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec()
        if (!user) {
            throw new NotFoundException(`User #${id} not found`)
        }
        return user
    }

    findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email }).exec()
    }

    create(payload: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(payload)
        return newUser.save()
    }

    async update(id: string, payload: UpdateUserDto): Promise<User> {
        const user = await this.userModel
            .findByIdAndUpdate(id, { $set: payload }, { new: true })
            .exec()
        if (!user) {
            throw new NotFoundException(`User #${id} not found`)
        }
        return user
    }

    async remove(id: string): Promise<boolean> {
        await this.findOne(id)
        await this.userModel.findByIdAndDelete(id).exec()
        return true
    }
}

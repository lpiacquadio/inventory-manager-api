import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Customer } from './customer.entity'
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto'

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel(Customer.name) private customerModel: Model<Customer>
    ) {}

    findAll(): Promise<Customer[]> {
        return this.customerModel.find().exec()
    }

    async findOne(id: string): Promise<Customer> {
        const customer = await this.customerModel.findById(id).exec()
        if (!customer) {
            throw new NotFoundException(`Customer #${id} not found`)
        }
        return customer
    }

    create(payload: CreateCustomerDto): Promise<Customer> {
        const newCustomer = new this.customerModel(payload)
        return newCustomer.save()
    }

    async update(id: string, payload: UpdateCustomerDto): Promise<Customer> {
        const customer = await this.customerModel
            .findByIdAndUpdate(id, { $set: payload }, { new: true })
            .exec()
        if (!customer) {
            throw new NotFoundException(`Customer #${id} not found`)
        }
        return customer
    }

    async remove(id: string): Promise<boolean> {
        await this.findOne(id)
        await this.customerModel.findByIdAndDelete(id).exec()
        return true
    }
}

import {
    forwardRef,
    Inject,
    Injectable,
    NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Order } from '../entities/order.entity'
import { CreateOrderDto } from '../dtos/order.dto'

import { UsersService } from '../../users/services/users.service'
import { ProductsService } from './products.service'

@Injectable()
export class OrdersService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private usersService: UsersService,
        private productsService: ProductsService,
        @InjectModel(Order.name) private orderModel: Model<Order>
    ) {}

    async findAll(id: string): Promise<Order[]> {
        return this.orderModel.find({ user: id }).exec()
    }

    async findOne(id: string): Promise<Order> {
        const order = await this.orderModel.findById(id).exec()
        if (!order) {
            throw new NotFoundException(`Order #${id} not found`)
        }
        return order
    }

    async create(payload: CreateOrderDto): Promise<Order> {
        await this.usersService.findOne(payload.user)
        const date = new Date()
        let total = 0
        const products = []
        for (const orderProduct of payload.products) {
            try {
                const product = await this.productsService.decrease(
                    orderProduct._id,
                    orderProduct.units
                )
                products.push({
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    units: orderProduct.units
                })
                total += product.price * orderProduct.units
            } catch (_) {}
        }
        const newOrder = new this.orderModel({
            user: payload.user,
            products,
            date,
            total
        })
        return newOrder.save()
    }
}

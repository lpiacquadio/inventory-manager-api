import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { Customer } from 'src/users/entities/customer.entity'
import { OrderProduct, OrderProductSchema } from './product.entity'

@Schema()
export class Order extends Document {
    @Prop({
        type: Types.ObjectId,
        ref: Customer.name,
        required: true,
        index: true
    })
    customer: Customer | Types.ObjectId

    @Prop({ type: [OrderProductSchema], required: true })
    products: Types.Array<OrderProduct>

    @Prop({ type: Date, required: true })
    date: Date

    @Prop({ required: true })
    total: number
}

export const OrderSchema = SchemaFactory.createForClass(Order)

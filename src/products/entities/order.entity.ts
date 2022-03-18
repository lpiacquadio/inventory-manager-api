import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { User } from '../../users/entities/user.entity'
import { OrderProduct, OrderProductSchema } from './product.entity'

@Schema()
export class Order extends Document {
    @Prop({
        type: Types.ObjectId,
        ref: User.name,
        required: true,
        index: true
    })
    user: User | Types.ObjectId

    @Prop({ type: [OrderProductSchema], required: true })
    products: Types.Array<OrderProduct>

    @Prop({ type: Date, required: true })
    date: Date

    @Prop({ required: true })
    total: number
}

export const OrderSchema = SchemaFactory.createForClass(Order)

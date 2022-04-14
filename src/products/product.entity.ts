import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { Category, CategorySchema } from 'src/categories/category.entity'
import { Brand, BrandSchema } from 'src/brands/brand.entity'

@Schema()
export class Product extends Document {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    description: string

    @Prop({ type: Number, required: true, index: true })
    price: number

    @Prop({ type: Number, required: true })
    stock: number

    @Prop({ required: true })
    image: string

    @Prop({ type: CategorySchema, required: true })
    category: Category

    @Prop({ type: BrandSchema, required: true })
    brand: Brand
}

export const ProductSchema = SchemaFactory.createForClass(Product)
ProductSchema.index({ price: 1, stock: -1 })

@Schema()
export class OrderProduct {
    @Prop()
    name: string

    @Prop()
    price: number

    @Prop()
    image: string

    @Prop()
    units: number
}

export const OrderProductSchema = SchemaFactory.createForClass(OrderProduct)

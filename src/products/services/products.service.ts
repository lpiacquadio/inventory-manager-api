import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, FilterQuery } from 'mongoose'

import { Product } from '../entities/product.entity'
import {
    CreateProductDto,
    UpdateProductDto,
    FilterProductsDto
} from '../dtos/product.dto'

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>
    ) {}

    findAll(
        params: FilterProductsDto = { limit: 100, offset: 0 }
    ): Promise<Product[]> {
        const filters: FilterQuery<Product> = {}
        const { limit = 100, offset = 0, minPrice, maxPrice, hasStock } = params
        if (minPrice && maxPrice) {
            filters.price = { $gte: minPrice, $lte: maxPrice }
        }
        if (hasStock) {
            filters.stock = { $gte: 1 }
        }
        return this.productModel
            .find(filters)
            .skip(offset * limit)
            .limit(limit)
            .exec()
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productModel.findById(id).exec()
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`)
        }
        return product
    }

    create(payload: CreateProductDto): Promise<Product> {
        const newProduct = new this.productModel(payload)
        return newProduct.save()
    }

    async update(id: string, payload: UpdateProductDto): Promise<Product> {
        const product = await this.productModel
            .findByIdAndUpdate(id, { $set: payload }, { new: true })
            .exec()
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`)
        }
        return product
    }

    async remove(id: string): Promise<boolean> {
        await this.findOne(id)
        await this.productModel.findByIdAndDelete(id).exec()
        return true
    }

    async decrease(id: string, units: number): Promise<Product> {
        const product = await this.productModel
            .findByIdAndUpdate(
                id,
                { $inc: { stock: units / -1 } },
                { new: true }
            )
            .exec()
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`)
        }
        return product
    }
}

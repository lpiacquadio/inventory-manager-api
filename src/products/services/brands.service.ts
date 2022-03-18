import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Brand } from '../entities/brand.entity'
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto'

@Injectable()
export class BrandsService {
    constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

    findAll(): Promise<Brand[]> {
        return this.brandModel.find().exec()
    }

    async findOne(id: string): Promise<Brand> {
        const brand = await this.brandModel.findById(id).exec()
        if (!brand) {
            throw new NotFoundException(`Brand #${id} not found`)
        }
        return brand
    }

    create(payload: CreateBrandDto): Promise<Brand> {
        const newBrand = new this.brandModel(payload)
        return newBrand.save()
    }

    async update(id: string, payload: UpdateBrandDto): Promise<Brand> {
        const brand = await this.brandModel
            .findByIdAndUpdate(id, { $set: payload }, { new: true })
            .exec()
        if (!brand) {
            throw new NotFoundException(`Brand #${id} not found`)
        }
        return brand
    }

    async remove(id: string): Promise<boolean> {
        await this.findOne(id)
        await this.brandModel.findByIdAndDelete(id).exec()
        return true
    }
}

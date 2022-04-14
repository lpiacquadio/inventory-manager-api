import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Category } from './category.entity'
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto'

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>
    ) {}

    findAll(): Promise<Category[]> {
        return this.categoryModel.find().exec()
    }

    async findOne(id: string): Promise<Category> {
        const category = await this.categoryModel.findById(id).exec()
        if (!category) {
            throw new NotFoundException(`Category #${id} not found`)
        }
        return category
    }

    create(payload: CreateCategoryDto): Promise<Category> {
        const newCategory = new this.categoryModel(payload)
        return newCategory.save()
    }

    async update(id: string, payload: UpdateCategoryDto): Promise<Category> {
        const category = await this.categoryModel
            .findByIdAndUpdate(id, { $set: payload }, { new: true })
            .exec()
        if (!category) {
            throw new NotFoundException(`Category #${id} not found`)
        }
        return category
    }

    async remove(id: string): Promise<boolean> {
        await this.findOne(id)
        await this.categoryModel.findByIdAndDelete(id).exec()
        return true
    }
}

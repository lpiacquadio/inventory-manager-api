import {
    IsString,
    IsNumber,
    IsUrl,
    IsNotEmpty,
    IsPositive,
    IsOptional,
    Min,
    ValidateIf,
    IsBoolean,
    IsMongoId,
    ValidateNested
} from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'

import { CreateCategoryDto } from '../dtos/category.dto'
import { CreateBrandDto } from '../dtos/brand.dto'

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly description: string

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    readonly price: number

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    readonly stock: number

    @IsUrl()
    @IsNotEmpty()
    @ApiProperty()
    readonly image: string

    @ValidateNested()
    @IsNotEmpty()
    @ApiProperty()
    readonly category: CreateCategoryDto

    @ValidateNested()
    @IsNotEmpty()
    @ApiProperty()
    readonly brand: CreateBrandDto
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
    @IsNumber()
    @IsOptional()
    @IsPositive()
    @ApiProperty()
    limit?: number

    @IsNumber()
    @IsOptional()
    @Min(0)
    @ApiProperty()
    offset?: number

    @IsNumber()
    @IsOptional()
    @IsPositive()
    @ApiProperty()
    minPrice?: number

    @IsNumber()
    @ValidateIf((params) => params.minPrice)
    @IsPositive()
    @ApiProperty()
    maxPrice?: number

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    hasStock?: boolean
}

export class OrderProductDto {
    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty()
    _id: string

    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    units: number
}

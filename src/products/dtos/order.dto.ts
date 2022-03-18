import { IsNotEmpty, IsMongoId, IsArray, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

import { OrderProductDto } from './product.dto'

export class CreateOrderDto {
    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty()
    readonly user: string

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderProductDto)
    readonly products: OrderProductDto[]
}

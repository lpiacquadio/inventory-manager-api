import { IsNotEmpty, IsMongoId, IsArray, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

import { OrderProductDto } from 'src/products/product.dto'

export class CreateOrderDto {
    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty()
    readonly customer: string

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderProductDto)
    readonly products: OrderProductDto[]
}

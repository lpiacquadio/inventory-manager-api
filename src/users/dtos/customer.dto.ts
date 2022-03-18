import {
    IsString,
    IsNotEmpty,
    IsPhoneNumber,
    ValidateNested,
    IsArray
} from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty, PartialType } from '@nestjs/swagger'

import { CreateSkillDto } from './skill.dto'

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly lastName: string

    @IsPhoneNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly phone: string

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSkillDto)
    @ApiProperty()
    readonly skills: CreateSkillDto[]
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

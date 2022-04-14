import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    readonly email: string

    @IsString()
    @IsNotEmpty()
    @Length(6)
    @ApiProperty()
    readonly password: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly role: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

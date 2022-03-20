import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ExcludeProperty } from 'nestjs-mongoose-exclude'
import * as bcrypt from 'bcrypt'

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    @ExcludeProperty()
    password: string

    @Prop({ required: true })
    role: string
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save', async function (next) {
    const user = this as User
    if (!user.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    return next()
})

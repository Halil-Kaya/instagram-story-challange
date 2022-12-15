import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { IUser } from '@app/interfaces/user.interface';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { hashSync } from 'bcryptjs';

export type UserDocument = User & Document;

@Schema({
    versionKey: false,
})
export class User implements IUser {
    @Prop({ type: MongooseSchema.Types.ObjectId, default: Types.ObjectId })
    _id: string;

    @Prop({ type: String, required: true })
    fullName: string;

    @Prop({ type: String, required: true })
    nickname: string;

    @Prop({ type: String, minlength: 4, maxlength: 24, select: false, required: true })
    password: string;

    @Prop({ type: Date, default: Date.now, required: false })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ nickname: 1 });

export function preSave(next: any) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = hashSync(this.password, 12);
    next();
}

export function postFindOne(result) {
    if (result) {
        result._id = result._id.toString();
    }
}

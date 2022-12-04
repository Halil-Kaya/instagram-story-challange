import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { postFindOne, preSave, User, UserSchema } from './model/user.model';
import { UserRepository } from './repository/user.repository';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                useFactory: () => {
                    UserSchema.pre('save', preSave);
                    UserSchema.post('findOne', postFindOne);
                    return UserSchema;
                },
            },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
})
export class UserModule {}

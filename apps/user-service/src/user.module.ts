import {Module} from '@nestjs/common';
import {UserController} from './controller/user.controller';
import {UserService} from './service/user.service';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost:27016/user')],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {
}

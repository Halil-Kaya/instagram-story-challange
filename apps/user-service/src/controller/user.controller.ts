import {Controller} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import * as UserPayloads from "../payload";
import {UserService} from "../service/user.service";
import {User} from "../model/user.model";

@Controller()
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @MessagePattern('create')
    async createUser(payload: UserPayloads.Create): Promise<User> {
        const user = await this.userService.create({
            nickname: (Math.random() + 1).toString(36).substring(7),
            password: '123123123',
            fullName: 'asdasdas'
        })
        console.log({user})
        const res = await this.userService.getUserForLogin(user._id)
        console.log({res})
        return user
    }
}

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
        return this.userService.create(payload)
    }
}

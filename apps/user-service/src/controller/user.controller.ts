import {Controller} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import * as UserPayloads from "../payload";
import {UserService} from "../service/user.service";
import {IUser} from "@app/interfaces/user.interface";

@Controller()
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @MessagePattern('create')
    async create(payload: UserPayloads.Create): Promise<IUser> {
        return this.userService.create(payload)
    }

    @MessagePattern('get-user-for-login')
    getUserForLogin(payload: UserPayloads.GetUserForLogin): Promise<IUser> {
        return this.userService.getUserForLogin(payload)
    }

}
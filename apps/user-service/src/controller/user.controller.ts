import {Controller} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import {UserService} from "../service/user.service";
import {IUser} from "@app/interfaces/user.interface";
import {UserServicePayloads} from "../payload";

@Controller()
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @MessagePattern('create')
    async create(payload: UserServicePayloads.Create): Promise<IUser> {
        return this.userService.create(payload)
    }

    @MessagePattern('get-user-for-login')
    getUserForLogin(payload: UserServicePayloads.GetUserForLogin): Promise<IUser> {
        return this.userService.getUserForLogin(payload)
    }
}
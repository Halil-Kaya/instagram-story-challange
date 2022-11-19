import {Controller, UseFilters, UseInterceptors} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import {UserService} from "../service/user.service";
import {IUser} from "@app/interfaces/user.interface";
import {UserServicePayloads} from "../payload";
import {RpcLoggerInterceptor} from "@app/interceptors/rpc-logger.interceptor";
import {RpcExceptionFilter} from "@app/filters/rpc-exception.filter";

@UseInterceptors(RpcLoggerInterceptor)
@UseFilters(RpcExceptionFilter)
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
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from '../service/user.service';
import { IUser } from '@app/interfaces/user.interface';
import { RpcLoggerInterceptor } from '@app/interceptors/rpc-logger.interceptor';
import { RpcExceptionFilter } from '@app/filters/rpc-exception.filter';
import { UserServicePatterns, UserServicePayloads } from '@app/payloads';

@UseInterceptors(RpcLoggerInterceptor)
@UseFilters(RpcExceptionFilter)
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern(UserServicePatterns.CREATE)
    async create(payload: UserServicePayloads.Create): Promise<IUser> {
        return this.userService.create(payload);
    }

    @MessagePattern(UserServicePatterns.GET_USER_FOR_LOGIN)
    getUserForLogin(payload: UserServicePayloads.GetUserForLogin): Promise<IUser> {
        return this.userService.getUserForLogin(payload);
    }
}

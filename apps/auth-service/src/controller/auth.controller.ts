import {Controller, UseFilters, UseInterceptors} from "@nestjs/common";
import {AuthService} from "../service/auth.service";
import {MessagePattern} from "@nestjs/microservices";
import {LoginAck} from "@app/interfaces/login.ack.interface";
import {RpcLoggerInterceptor} from "@app/interceptors";
import {RpcExceptionFilter} from "@app/filters";

@UseInterceptors(RpcLoggerInterceptor)
@UseFilters(RpcExceptionFilter)
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @MessagePattern('login')
    async login(payload: any): Promise<LoginAck> {
        return this.authService.login(payload)
    }
}
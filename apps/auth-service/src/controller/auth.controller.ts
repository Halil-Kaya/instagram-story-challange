import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { LoginAck } from '@app/interfaces/login.ack.interface';
import { RpcLoggerInterceptor } from '@app/interceptors';
import { RpcExceptionFilter } from '@app/filters';
import { AuthServicePatterns } from '@app/payloads';
import { AuthServicePayloads } from '@app/payloads';

@UseInterceptors(RpcLoggerInterceptor)
@UseFilters(RpcExceptionFilter)
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern(AuthServicePatterns.LOGIN)
    async login(payload: AuthServicePayloads.LoginPayload): Promise<LoginAck> {
        return this.authService.login(payload);
    }

    @MessagePattern(AuthServicePatterns.LOGOUT)
    async logout(payload: AuthServicePayloads.LogoutPayload): Promise<void> {
        return this.authService.logout(payload);
    }
}

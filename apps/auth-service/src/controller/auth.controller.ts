import { Controller, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from '../service/auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { LoginAck } from '@app/interfaces/login.ack.interface';
import { RpcLoggerInterceptor } from '@app/interceptors';
import { RpcExceptionFilter } from '@app/filters';
import { AuthServicePatterns } from '@app/payloads';
import { AuthServicePayloads } from '@app/payloads';

@UseInterceptors(RpcLoggerInterceptor)
@UseFilters(RpcExceptionFilter)
@UsePipes(new ValidationPipe())
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern(AuthServicePatterns.LOGIN)
    async login(payload: AuthServicePayloads.Login): Promise<LoginAck> {
        return this.authService.login(payload);
    }

    @MessagePattern(AuthServicePatterns.LOGOUT)
    async logout(payload: AuthServicePayloads.Logout): Promise<void> {
        return this.authService.logout(payload);
    }
}

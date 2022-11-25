import {Body, Controller, Inject, Post} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {LoginDto} from "./dto/login.dto";
import {timeout} from "rxjs";
import {AuthServicePatterns} from "@app/payloads";
import {LoginAck} from "@app/interfaces/login.ack.interface";
import {AuthServicePayloads} from "@app/payloads"

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private authServiceClient: ClientProxy) {
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        return this.authServiceClient.send<LoginAck, AuthServicePayloads.LoginPayload>(AuthServicePatterns.LOGIN, dto)
            .pipe(timeout(5000))
    }
}
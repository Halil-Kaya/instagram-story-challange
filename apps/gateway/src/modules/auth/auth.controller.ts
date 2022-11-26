import {Body, Controller, Inject, Post, UseGuards} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {LoginDto} from "./dto/login.dto";
import {timeout} from "rxjs";
import {AuthServicePatterns} from "@app/payloads";
import {LoginAck} from "@app/interfaces/login.ack.interface";
import {AuthServicePayloads} from "@app/payloads"
import {CurrentUser} from "../../core/decorator";
import {JWTGuard} from "../../core/guard";

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private authServiceClient: ClientProxy) {
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authServiceClient.send<LoginAck, AuthServicePayloads.LoginPayload>(AuthServicePatterns.LOGIN, dto)
            .pipe(timeout(5000))
    }

    @UseGuards(JWTGuard)
    @Post('logout')
    logout(@CurrentUser() user) {
        return this.authServiceClient.emit<void, AuthServicePayloads.LogoutPayload>(AuthServicePatterns.LOGOUT, {
            _id: user._id
        }).pipe(timeout(5000))
    }
}
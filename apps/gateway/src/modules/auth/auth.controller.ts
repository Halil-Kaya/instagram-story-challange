import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { timeout } from 'rxjs';
import { AuthServicePatterns, Services } from '@app/payloads';
import { AuthServicePayloads } from '@app/payloads';
import { ApiExceptions, ApiResponseWithSchema, CurrentUser, HttpStatusCodes } from "../../core/decorator";
import { JWTGuard } from '../../core/guard';
import { IUser } from '@app/interfaces';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from "@nestjs/swagger";
import { InvalidCredentialsException } from "@app/exceptions";
import * as acks from "./ack";
import { LoginAck, LogoutAck } from "./ack";

@ApiTags('auth')
@ApiExtraModels(...Object.values(acks))
@Controller('auth')
export class AuthController {
    constructor(@Inject(Services.AUTH_SERVICE) private authServiceClient: ClientProxy) {}

    @ApiExceptions(InvalidCredentialsException)
    @ApiResponseWithSchema(HttpStatusCodes.CREATED,LoginAck)
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authServiceClient
            .send<LoginAck, AuthServicePayloads.Login>(AuthServicePatterns.LOGIN, dto)
            .pipe(timeout(5000));
    }

    @UseGuards(JWTGuard)
    @ApiBearerAuth()
    @ApiResponseWithSchema(HttpStatusCodes.CREATED,LogoutAck)
    @Post('logout')
    logout(@CurrentUser() user: IUser) {
        return this.authServiceClient
            .emit<void, AuthServicePayloads.Logout>(AuthServicePatterns.LOGOUT, {
                _id: user._id
            })
            .pipe(timeout(5000));
    }
}

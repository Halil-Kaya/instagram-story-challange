import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserCreateDto } from './dto';
import { timeout } from 'rxjs';
import { Services, UserServicePatterns } from '@app/payloads';
import { IUser } from '@app/interfaces/user.interface';
import { UserServicePayloads } from '@app/payloads';
import { ApiTags } from '@nestjs/swagger';
import { NicknameAlreadyTakenException } from "@app/exceptions";
import { ApiExceptions, ApiResponseWithSchema } from "../../core/decorator";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(@Inject(Services.USER_SERVICE) private userServiceClient: ClientProxy) {}

    @ApiExceptions(NicknameAlreadyTakenException)
    @ApiResponseWithSchema()
    @Post('create')
    create(@Body() dto: UserCreateDto) {
        return this.userServiceClient
            .send<IUser, UserServicePayloads.Create>(UserServicePatterns.CREATE, dto)
            .pipe(timeout(5000));
    }
}

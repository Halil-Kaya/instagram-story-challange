import {Body, Controller, Inject, Post} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {UserCreateDto} from "./dto";
import {timeout} from "rxjs";

@Controller('user')
export class UserController {
    constructor(@Inject('USER_SERVICE') private userServiceClient: ClientProxy) {
    }

    @Post('create')
    create(@Body() dto: UserCreateDto) {
        return this.userServiceClient.send('create', dto)
            .pipe(timeout(5000))
    }
}
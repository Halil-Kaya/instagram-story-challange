import {Body, Controller, Inject, Post} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {UserCreateDto} from "./dto";

@Controller('user')
export class UserController {
    constructor(@Inject('USER_SERVICE') private client: ClientProxy) {
    }

    @Post('create')
    create(@Body() dto: UserCreateDto) {
        return this.client.send('create', dto)
    }
}
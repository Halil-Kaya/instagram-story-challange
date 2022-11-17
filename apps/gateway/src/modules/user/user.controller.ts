import {Body, Controller, Inject, Post} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {UserCreateDto} from "./dto";
import {catchError, timeout} from "rxjs";
import {GeneralServerException} from "@app/exceptions/exceptions/general-server.exception";

@Controller('user')
export class UserController {
    constructor(@Inject('USER_SERVICE') private client: ClientProxy) {
    }

    @Post('create')
    create(@Body() dto: UserCreateDto) {
        console.log("req geldi")
        return this.client.send('create', {
            fullName: 'halil kaya',
            password: '12345678',
            nickname: 'hlk'
        })
            .pipe(
                catchError((err): any => {
                    console.log(err)
                })
            )
    }

}
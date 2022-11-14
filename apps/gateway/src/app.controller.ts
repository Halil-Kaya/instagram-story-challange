import {Controller, Get, Inject} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {catchError} from "rxjs";

@Controller()
export class AppController {
    constructor(@Inject('USER_SERVICE') private client: ClientProxy) {
    }

    @Get()
    async getHello() {
        console.log("istek geldi")
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

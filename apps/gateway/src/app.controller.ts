import {Controller, Get, Inject} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {firstValueFrom} from "rxjs";

@Controller()
export class AppController {
    constructor(@Inject('USER_SERVICE') private client: ClientProxy) {
    }

    @Get()
    async getHello() {
        console.log("istek geldi")
        const re = await firstValueFrom(this.client.send('test', ''))
        console.log(re)
        return re
    }
}

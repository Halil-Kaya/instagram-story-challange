import {Controller} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";

@Controller()
export class UserController {

    @MessagePattern('test')
    async accumulate(data: any) {
        console.log("mesaj geldi")
        return "data geldi"
    }

}

import {Controller} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import * as UserPayloads from "../payload";

@Controller()
export class UserController {

    @MessagePattern('create')
    async accumulate(data: UserPayloads.Create)  {
        console.log("mesaj geldi-> ", data)
        return "data geldi"
    }

}

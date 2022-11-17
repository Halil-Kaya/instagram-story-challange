import {Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'USER_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: 'user-service'
                }
            },
        ]),
    ],
    controllers: [UserController],
    providers: []
})
export class UserModule {
}
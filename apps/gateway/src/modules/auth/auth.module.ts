import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {JWTStrategy} from "../../core/strategy";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'AUTH_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: 'auth-service'
                }
            },
        ])
    ],
    controllers: [AuthController],
    providers: [JWTStrategy]
})
export class AuthModule {
}
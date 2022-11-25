import {Module} from '@nestjs/common';
import {UserModule} from "./modules/user/user.module";
import {AuthModule} from "./modules/auth/auth.module";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: 'environments/gateway.env',
            isGlobal: true
        }),
        UserModule,
        AuthModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
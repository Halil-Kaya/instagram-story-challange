import {Module} from '@nestjs/common';
import {AuthModule} from "./auth.module";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: 'environments/auth-service.env',
            isGlobal: true
        }),
        AuthModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}

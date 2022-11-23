import {Module} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {IEnvironment} from "./environment.interface";
import {AuthController} from "./controller/auth.controller";
import {AuthService} from "./service/auth.service";
import {AuthCacheRepository} from "./repository/auth-cache.repository";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [],
            useFactory: async (configService: ConfigService<IEnvironment>) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRES')
                }
            }),
            inject: [ConfigService]
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthCacheRepository],
})
export class AuthModule {
}

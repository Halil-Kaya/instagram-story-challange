import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IEnvironment } from './environment.interface';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { AuthCacheService } from './repository/auth-cache.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisModule } from '@nestjs-modules/ioredis';
import { Services } from '@app/payloads';

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
        ClientsModule.register([
            {
                name: Services.USER_SERVICE,
                transport: Transport.TCP,
                options: {
                    host: 'user-service'
                }
            }
        ]),
        RedisModule.forRootAsync({
            imports: [],
            useFactory: async (configService: ConfigService<IEnvironment>) => ({
                config: {
                    host: configService.get('REDIS_HOST'),
                    port: configService.get('REDIS_PORT')
                }
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthCacheService]
})
export class AuthModule {}

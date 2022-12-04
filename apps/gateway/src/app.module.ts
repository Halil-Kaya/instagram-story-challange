import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { IEnvironment } from './environment.interface';
import { StoryModule } from './modules/story/story.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: 'environments/gateway.env',
            isGlobal: true,
        }),
        RedisModule.forRootAsync({
            imports: [],
            useFactory: async (configService: ConfigService<IEnvironment>) => ({
                config: {
                    host: configService.get('REDIS_HOST'),
                    port: configService.get('REDIS_PORT'),
                },
            }),
            inject: [ConfigService],
        }),
        UserModule,
        AuthModule,
        StoryModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

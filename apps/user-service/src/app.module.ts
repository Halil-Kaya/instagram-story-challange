import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IEnvironment } from './environment.interface';
import { UserModule } from './user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: 'environments/user-service.env',
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService<IEnvironment>) => ({
                uri: configService.get<string>('MONGO_CONNECTION_URL'),
            }),
            inject: [ConfigService],
        }),
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

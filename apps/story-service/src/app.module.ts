import { Module } from '@nestjs/common';
import { StoryModule } from './story.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IEnvironment } from './environment.interface';
import { Story } from './model/story.model';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: 'environments/story-service.env',
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService<IEnvironment>) => ({
                type: 'postgres',
                host: configService.get<string>('POSTGRESQL_HOST'),
                port: configService.get<number>('POSTGRESQL_PORT'),
                username: configService.get<string>('POSTGRESQL_USERNAME'),
                password: configService.get<string>('POSTGRESQL_PASSWORD'),
                database: configService.get<string>('POSTGRESQL_DATABASE'),
                entities: [Story],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        StoryModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

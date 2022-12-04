import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {QueueModule} from "./queue.module";
import {BullModule} from "@nestjs/bull";
import {IEnvironment} from "./environment.interface";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: 'environments/queue-service.env',
            isGlobal: true
        }),
        BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService<IEnvironment>) => ({
                redis: {
                    host: configService.get<string>('REDIS_HOST'),
                    port: configService.get<number>('REDIS_PORT'),
                },
            }),
            inject: [ConfigService]
        }),
        QueueModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {

}
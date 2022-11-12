import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";
import {IEnvironment} from "./environment.interface";
import {AppModule} from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: {
            host: '0.0.0.0'
        }
    });
    const config = app.get(ConfigService)
    console.log(config.get<IEnvironment>('MONGO_CONNECTION_URL'))


    await app.startAllMicroservices();
}

bootstrap()
    .then(async (app) => {
        console.log(`user-service microservice is up`)
    });

import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {UserModule} from "./user.module";

async function bootstrap() {
    const app = await NestFactory.create(UserModule);
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
    });
    await app.startAllMicroservices();
}

bootstrap()
    .then(async (app) => {
        console.log(`user-service microservice is up`)
    });

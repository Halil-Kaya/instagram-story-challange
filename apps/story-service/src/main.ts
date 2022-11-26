import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from "@nestjs/common";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {AppModule} from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: {
            host: '0.0.0.0'
        }
    });
    app.useGlobalPipes(new ValidationPipe({
        forbidNonWhitelisted: true,
        whitelist: true,
        transform: true,
    }))
    await app.startAllMicroservices();
}

bootstrap()
    .then(() => {
        console.log(`story-service microservice is up`)
    });

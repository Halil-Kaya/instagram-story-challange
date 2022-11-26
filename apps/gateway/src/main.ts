import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {TransformInterceptor} from "@app/interceptors/transform.interceptor";
import {GatewayExceptionFilter} from "@app/filters/gateway-exception.filter";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new TransformInterceptor())
    app.useGlobalFilters(new GatewayExceptionFilter())
    app.useGlobalPipes(new ValidationPipe({
        forbidNonWhitelisted: true,
        whitelist: true,
        transform: true,
    }))
    await app.listen(3050);
    return app;
}

bootstrap()
    .then(async (app) => {
        console.log(`gateway is up on : ${await app.getUrl()}`)
    });

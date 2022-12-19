import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from '@app/interceptors/transform.interceptor';
import { GatewayExceptionFilter } from '@app/filters/gateway-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('Nestjs Instagram story example project')
        .setDescription(
            'Hi ✋I tried to make an example with using microservices and queues. so I tried to make an example of instagram story feature.' +
                'every created story is deleted within 24 seconds.'
        )
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new GatewayExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            forbidNonWhitelisted: true,
            whitelist: true,
            transform: true
        })
    );
    await app.listen(3050);
    return app;
}

bootstrap().then(async (app) => {
    console.log(`gateway is up on : ${await app.getUrl()}`);
});

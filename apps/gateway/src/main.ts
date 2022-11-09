import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3050);
    return app;
}

bootstrap()
    .then(async (app) => {
        console.log(`gateway is up on : ${await app.getUrl()}`)
    });

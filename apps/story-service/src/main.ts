import { NestFactory } from '@nestjs/core';
import { StoryServiceModule } from './story-service.module';

async function bootstrap() {
  const app = await NestFactory.create(StoryServiceModule);
  await app.listen(3000);
}
bootstrap();

import { Module } from '@nestjs/common';
import { StoryServiceController } from './story-service.controller';
import { StoryServiceService } from './story-service.service';

@Module({
  imports: [],
  controllers: [StoryServiceController],
  providers: [StoryServiceService],
})
export class StoryServiceModule {}

import { Controller, Get } from '@nestjs/common';
import { StoryServiceService } from './story-service.service';

@Controller()
export class StoryServiceController {
  constructor(private readonly storyServiceService: StoryServiceService) {}

  @Get()
  getHello(): string {
    return this.storyServiceService.getHello();
  }
}

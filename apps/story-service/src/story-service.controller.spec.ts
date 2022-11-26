import { Test, TestingModule } from '@nestjs/testing';
import { StoryServiceController } from './story-service.controller';
import { StoryServiceService } from './story-service.service';

describe('StoryServiceController', () => {
  let storyServiceController: StoryServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StoryServiceController],
      providers: [StoryServiceService],
    }).compile();

    storyServiceController = app.get<StoryServiceController>(StoryServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(storyServiceController.getHello()).toBe('Hello World!');
    });
  });
});

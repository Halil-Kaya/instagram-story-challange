import { Test, TestingModule } from '@nestjs/testing';
import { QueueServiceController } from './queue-service.controller';
import { QueueServiceService } from './queue-service.service';

describe('QueueServiceController', () => {
  let queueServiceController: QueueServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [QueueServiceController],
      providers: [QueueServiceService],
    }).compile();

    queueServiceController = app.get<QueueServiceController>(QueueServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(queueServiceController.getHello()).toBe('Hello World!');
    });
  });
});

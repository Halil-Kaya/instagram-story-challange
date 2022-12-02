import { Module } from '@nestjs/common';
import { QueueServiceController } from './queue-service.controller';
import { QueueServiceService } from './queue-service.service';

@Module({
  imports: [],
  controllers: [QueueServiceController],
  providers: [QueueServiceService],
})
export class QueueServiceModule {}

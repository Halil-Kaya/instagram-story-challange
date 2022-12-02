import { Controller, Get } from '@nestjs/common';
import { QueueServiceService } from './queue-service.service';

@Controller()
export class QueueServiceController {
  constructor(private readonly queueServiceService: QueueServiceService) {}

  @Get()
  getHello(): string {
    return this.queueServiceService.getHello();
  }
}

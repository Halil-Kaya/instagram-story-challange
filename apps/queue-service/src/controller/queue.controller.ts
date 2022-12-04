import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { QueueService } from '../service/queue.service';
import { MessagePattern } from '@nestjs/microservices';
import { QueueServicePatterns, QueueServicePayloads } from '@app/payloads';
import { RpcLoggerInterceptor } from '@app/interceptors';
import { RpcExceptionFilter } from '@app/filters';

@UseInterceptors(RpcLoggerInterceptor)
@UseFilters(RpcExceptionFilter)
@Controller()
export class QueueController {
    constructor(private readonly queueService: QueueService) {}

    @MessagePattern(QueueServicePatterns.ADD_TO_QUEUE)
    async addToQueueForDelayDelete(payload: QueueServicePayloads.AddToQueue): Promise<void> {
        await this.queueService.addStoryToQueue(payload);
    }
}

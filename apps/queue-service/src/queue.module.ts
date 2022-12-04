import { Module } from '@nestjs/common';
import { QueueController } from './controller/queue.controller';
import { QueueService } from './service/queue.service';
import { BullModule } from '@nestjs/bull';
import { StoryConsumer } from './consumer/story.consumer';
import { JobQueues } from './jobs';

@Module({
    imports: [
        BullModule.registerQueue({
            name: JobQueues.STORY,
        }),
    ],
    controllers: [QueueController],
    providers: [QueueService, StoryConsumer],
})
export class QueueModule {}

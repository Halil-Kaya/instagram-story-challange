import { Module } from '@nestjs/common';
import { QueueController } from './controller/queue.controller';
import { QueueService } from './service/queue.service';
import { BullModule } from '@nestjs/bull';
import { StoryConsumer } from './consumer/story.consumer';
import { JobQueues } from './jobs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Services } from '@app/payloads';

@Module({
    imports: [
        BullModule.registerQueue({
            name: JobQueues.STORY
        }),
        ClientsModule.register([
            {
                name: Services.STORY_SERVICE,
                transport: Transport.TCP,
                options: {
                    host: 'story-service'
                }
            }
        ])
    ],
    controllers: [QueueController],
    providers: [QueueService, StoryConsumer]
})
export class QueueModule {}

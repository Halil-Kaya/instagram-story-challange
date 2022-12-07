import {Inject, Injectable} from '@nestjs/common';
import {StoryRepository} from '../repository/story.repository';
import {QueueServicePatterns, Services, StoryServicePayloads, QueueServicePayloads} from '@app/payloads';
import {IStory} from '@app/interfaces';
import {ClientProxy} from '@nestjs/microservices';

@Injectable()
export class StoryService {
    constructor(
        private readonly storyRepository: StoryRepository,
        @Inject(Services.QUEUE_SERVICE) private queueServiceClient: ClientProxy,
    ) {
    }

    async create(payload: StoryServicePayloads.Create): Promise<IStory> {
        const createdStory = await this.storyRepository.create(payload);
        this.queueServiceClient.emit<void, QueueServicePayloads.AddToQueue>(QueueServicePatterns.ADD_TO_QUEUE, {
            id: createdStory.id,
        });
        return createdStory;
    }

    async delete(payload: StoryServicePayloads.Delete): Promise<void> {
        await this.storyRepository.delete(payload)
    }
}

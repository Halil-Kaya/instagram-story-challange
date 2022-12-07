import {Process, Processor} from '@nestjs/bull';
import {Job} from 'bull';
import {DeleteStoryJob, JobNames, JobQueues} from '../jobs';
import {Inject, Injectable} from '@nestjs/common';
import {Services, StoryServicePatterns, StoryServicePayloads} from "@app/payloads";
import {ClientProxy} from "@nestjs/microservices";

@Processor(JobQueues.STORY)
@Injectable()
export class StoryConsumer {

    constructor(@Inject(Services.STORY_SERVICE) private storyServiceClient: ClientProxy) {
    }

    @Process(JobNames.DELETE_STORY)
    async triggerToDeleteEmit(job: Job<DeleteStoryJob>) {
        const {id} = job.data;
        this.storyServiceClient.emit<void, StoryServicePayloads.Delete>(StoryServicePatterns.DELETE, {
            id
        });
    }
}

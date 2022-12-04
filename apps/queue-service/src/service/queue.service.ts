import {Injectable} from "@nestjs/common";
import {QueueServicePayloads} from '@app/payloads'
import {Queue} from 'bull';
import {InjectQueue} from "@nestjs/bull";
import {ConfigService} from "@nestjs/config";
import {IEnvironment} from "../environment.interface";
import {DeleteStoryJob, JobNames, JobQueues} from "../jobs";

@Injectable()
export class QueueService {
    constructor(@InjectQueue(JobQueues.STORY) private storyQueue: Queue,
                private readonly configService: ConfigService<IEnvironment>) {
    }

    async addStoryToQueue(payload: QueueServicePayloads.AddToQueue): Promise<void> {
        await this.storyQueue.add(JobNames.DELETE_STORY, <DeleteStoryJob>payload, {
            removeOnFail: true,
            removeOnComplete: true,
            delay: this.configService.get<number>('DELAY_TIME_FOR_DELETE_STORY_JOB')
        })
    }
}
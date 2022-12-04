import {Process, Processor} from "@nestjs/bull";
import {Job} from 'bull';
import {DeleteStoryJob, JobNames, JobQueues} from "../jobs";
import {Injectable} from "@nestjs/common";

@Processor(JobQueues.STORY)
@Injectable()
export class StoryConsumer {

    @Process(JobNames.DELETE_STORY)
    async transcode(job: Job<DeleteStoryJob>) {
        const {id} = job.data
        console.log("id to delete -> ", id)
        return {};
    }
}
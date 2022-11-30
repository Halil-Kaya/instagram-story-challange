import {Injectable} from "@nestjs/common";
import {StoryRepository} from "../repository/story.repository";
import {StoryServicePayloads} from '@app/payloads'
import {IStory} from "@app/interfaces";

@Injectable()
export class StoryService {
    constructor(private readonly storyRepository: StoryRepository) {
    }

    async create(payload: StoryServicePayloads.Create): Promise<IStory> {
        return this.storyRepository.create(payload)
    }
}
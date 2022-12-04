import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from '../model/story.model';
import { Repository } from 'typeorm';
import { StoryServicePayloads } from '@app/payloads';
import { IStory } from '@app/interfaces';

@Injectable()
export class StoryRepository {
    constructor(@InjectRepository(Story) private readonly storyRepository: Repository<Story>) {}

    async create(payload: StoryServicePayloads.Create): Promise<IStory> {
        const story = this.storyRepository.create(payload);
        return this.storyRepository.save(story);
    }
}

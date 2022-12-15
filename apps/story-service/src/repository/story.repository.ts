import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Story} from '../model/story.model';
import { DeleteResult, FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import {StoryServicePayloads} from '@app/payloads';
import {IStory} from '@app/interfaces';

@Injectable()
export class StoryRepository {
    constructor(@InjectRepository(Story) private readonly storyRepository: Repository<Story>) {
    }

    create(payload: StoryServicePayloads.Create): Promise<IStory> {
        const story = this.storyRepository.create(payload);
        return this.storyRepository.save(story);
    }

		find(options : FindManyOptions<IStory>){
			return this.storyRepository.find(options)
		}


		countBy(query : FindOptionsWhere<IStory>){
			return this.storyRepository.countBy(query)
		}

    delete({id}: StoryServicePayloads.Delete): Promise<DeleteResult> {
        return this.storyRepository.delete({id})
    }
}

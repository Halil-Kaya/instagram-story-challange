import {Inject, Injectable} from '@nestjs/common';
import {StoryRepository} from '../repository/story.repository';
import {QueueServicePatterns, Services, StoryServicePayloads, QueueServicePayloads} from '@app/payloads';
import { IStory, PaginatedResponse, Pagination } from "@app/interfaces";
import {ClientProxy} from '@nestjs/microservices';
import { FindOptionsWhere } from "typeorm";

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

    async fetchStories(payload : StoryServicePayloads.Fetch) : Promise<PaginatedResponse<IStory>>{
        const { pagination, userId } = payload
        const query = {
            userId
        }
        await this.updatePagination(payload.pagination,query)
        const items = await this.storyRepository.find({
            where: query,
            skip : pagination.offset,
            take : pagination.limit
        });
        return{
            pagination,
            items
        }
    }

    private async updatePagination(
        pagination: Pagination, query?: FindOptionsWhere<IStory>): Promise<void> {
        pagination.totalItemCount = await this.storyRepository.countBy(query);
        pagination.offset = pagination?.offset ? pagination.offset : 0;
        pagination.totalPageCount = pagination.totalItemCount == pagination.limit ? 0 : Math.floor(pagination.totalItemCount / pagination.limit);
    }
}

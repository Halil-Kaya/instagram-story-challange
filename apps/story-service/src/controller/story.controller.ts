import { Controller, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import {StoryService} from '../service/story.service';
import {MessagePattern} from '@nestjs/microservices';
import {StoryServicePatterns, StoryServicePayloads} from '@app/payloads';
import {IStory} from '@app/interfaces';
import {RpcLoggerInterceptor} from '@app/interceptors';
import {RpcExceptionFilter} from '@app/filters';
import { PaginatedResponse } from "@app/interfaces/pagination.interface";

@UseInterceptors(RpcLoggerInterceptor)
@UseFilters(RpcExceptionFilter)
@UsePipes(new ValidationPipe())
@Controller()
export class StoryController {
    constructor(private readonly storyService: StoryService) {
    }

    @MessagePattern(StoryServicePatterns.CREATE)
    async create(payload: StoryServicePayloads.Create): Promise<IStory> {
        return this.storyService.create(payload);
    }

    @MessagePattern(StoryServicePatterns.FETCH)
    async getStories(payload: StoryServicePayloads.Fetch): Promise<PaginatedResponse<IStory>> {
        return this.storyService.fetchStories(payload);
    }


    @MessagePattern(StoryServicePatterns.DELETE)
    async delete(payload: StoryServicePayloads.Delete): Promise<void> {
        return this.storyService.delete(payload);
    }



}

import {Controller, UseFilters, UseInterceptors} from "@nestjs/common";
import {StoryService} from "../service/story.service";
import {MessagePattern} from "@nestjs/microservices";
import {StoryServicePatterns, StoryServicePayloads} from "@app/payloads";
import {IStory} from "@app/interfaces";
import {RpcLoggerInterceptor} from "@app/interceptors";
import {RpcExceptionFilter} from "@app/filters";

@UseInterceptors(RpcLoggerInterceptor)
@UseFilters(RpcExceptionFilter)
@Controller()
export class StoryController {
    constructor(private readonly storyService: StoryService) {
    }

    @MessagePattern(StoryServicePatterns.CREATE)
    async create(payload: StoryServicePayloads.Create): Promise<IStory> {
        return this.storyService.create(payload)
    }
}
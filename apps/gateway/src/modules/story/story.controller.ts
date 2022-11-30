import {Body, Controller, Inject, Post} from "@nestjs/common";
import {StoryCreateDto} from "./dto";
import {ClientProxy} from "@nestjs/microservices";
import {IStory} from "@app/interfaces";
import {StoryServicePayloads, StoryServicePatterns, Services} from "@app/payloads";
import {timeout} from "rxjs";

@Controller()
export class StoryController {
    constructor(@Inject(Services.STORY_SERVICE) private storyServiceClient: ClientProxy) {
    }

    @Post()
    async createStory(@Body() dto: StoryCreateDto) {
        return this.storyServiceClient.send<IStory, StoryServicePayloads.Create>(StoryServicePatterns.CREATE, dto)
            .pipe(timeout(5000))
    }
}
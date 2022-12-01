import {Body, Controller, Inject, Post, UseGuards} from "@nestjs/common";
import {StoryCreateDto} from "./dto";
import {ClientProxy} from "@nestjs/microservices";
import {IStory, IUser} from "@app/interfaces";
import {StoryServicePayloads, StoryServicePatterns, Services} from "@app/payloads";
import {timeout} from "rxjs";
import {JWTGuard} from "../../core/guard";
import {CurrentUser} from "../../core/decorator";

@Controller('story')
export class StoryController {
    constructor(@Inject(Services.STORY_SERVICE) private storyServiceClient: ClientProxy) {
    }

    @UseGuards(JWTGuard)
    @Post()
    async createStory(@Body() dto: StoryCreateDto, @CurrentUser() user: IUser) {
        return this.storyServiceClient.send<IStory, StoryServicePayloads.Create>(StoryServicePatterns.CREATE, {
            ...dto,
            userId: user._id
        })
            .pipe(timeout(5000))
    }
}
import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Story} from "./model/story.model";
import {StoryController} from "./controller/story.controller";
import {StoryService} from "./service/story.service";
import {StoryRepository} from "./repository/story.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Story])],
    controllers: [StoryController],
    providers: [StoryService, StoryRepository],
})
export class StoryModule {
}

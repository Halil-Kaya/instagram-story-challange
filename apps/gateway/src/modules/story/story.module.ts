import {Module} from "@nestjs/common";
import {StoryController} from "./story.controller";

@Module({
    imports: [],
    controllers: [StoryController],
    providers: []
})
export class StoryModule {
}
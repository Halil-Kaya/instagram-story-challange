import {Module} from "@nestjs/common";
import {StoryModule} from "./story.module";

@Module({
    imports: [StoryModule],
    controllers: [],
    providers: [],
})
export class AppModule {

}
import {Module} from "@nestjs/common";
import {StoryController} from "./story.controller";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {Services} from "@app/payloads";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: Services.STORY_SERVICE,
                transport: Transport.TCP,
                options: {
                    host: 'story-service'
                }
            },
        ])
    ],
    controllers: [StoryController],
    providers: []
})
export class StoryModule {
}
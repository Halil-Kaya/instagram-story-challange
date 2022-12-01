import {Module} from "@nestjs/common";
import {StoryController} from "./story.controller";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {Services} from "@app/payloads";
import {JWTStrategy} from "../../core/strategy";

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
    providers: [JWTStrategy]
})
export class StoryModule {
}
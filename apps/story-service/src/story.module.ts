import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Story} from "./model/story.model";
import {StoryController} from "./controller/story.controller";
import {StoryService} from "./service/story.service";
import {StoryRepository} from "./repository/story.repository";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {Services} from "@app/payloads";

@Module({
    imports: [
        TypeOrmModule.forFeature([Story]),
        ClientsModule.register([
            {
                name: Services.QUEUE_SERVICE,
                transport: Transport.TCP,
                options: {
                    host: 'queue-service'
                }
            },
        ])],
    controllers: [StoryController],
    providers: [StoryService, StoryRepository],
})
export class StoryModule {
}

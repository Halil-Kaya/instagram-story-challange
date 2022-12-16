import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { StoryCreateDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';
import { IStory, IUser } from '@app/interfaces';
import { StoryServicePayloads, StoryServicePatterns, Services } from '@app/payloads';
import { timeout } from 'rxjs';
import { JWTGuard } from '../../core/guard';
import { CurrentUser, Paginate } from '../../core/decorator';
import { PaginatedResponse, Pagination } from '@app/interfaces/pagination.interface';

@Controller('story')
export class StoryController {
    constructor(@Inject(Services.STORY_SERVICE) private storyServiceClient: ClientProxy) {}

    @UseGuards(JWTGuard)
    @Post()
    async createStory(@Body() dto: StoryCreateDto, @CurrentUser() user: IUser) {
        return this.storyServiceClient
            .send<IStory, StoryServicePayloads.Create>(StoryServicePatterns.CREATE, {
                ...dto,
                userId: user._id
            })
            .pipe(timeout(5000));
    }

    @UseGuards(JWTGuard)
    @Get()
    async getStories(@Paginate() pagination: Pagination, @CurrentUser() user: IUser) {
        return this.storyServiceClient
            .send<PaginatedResponse<IStory>, StoryServicePayloads.Fetch>(StoryServicePatterns.FETCH, {
                pagination,
                userId: user._id
            })
            .pipe(timeout(5000));
    }
}

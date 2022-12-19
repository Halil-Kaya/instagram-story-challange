import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { StoryCreateDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';
import { IStory, IUser } from '@app/interfaces';
import { StoryServicePayloads, StoryServicePatterns, Services } from '@app/payloads';
import { timeout } from 'rxjs';
import { JWTGuard } from '../../core/guard';
import { ApiResponseWithSchema, CurrentUser, HttpStatusCodes, Paginate } from '../../core/decorator';
import { PaginatedResponse, Pagination } from '@app/interfaces/pagination.interface';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import * as acks from './ack';
import { StoryCreateAck, GetStoriesAck } from './ack';

@ApiTags('story')
@ApiExtraModels(...Object.values(acks))
@Controller('story')
export class StoryController {
    constructor(@Inject(Services.STORY_SERVICE) private storyServiceClient: ClientProxy) {}

    @UseGuards(JWTGuard)
    @ApiBearerAuth()
    @ApiResponseWithSchema(HttpStatusCodes.CREATED, StoryCreateAck)
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
    @ApiBearerAuth()
    @ApiExtraModels(IStory)
    @ApiResponseWithSchema(HttpStatusCodes.OK, GetStoriesAck)
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

import { baseUri } from './index';
import axios, { AxiosResponse } from 'axios';
import { Response } from '@app/interceptors';
import { IStory, PaginatedResponse, Pagination } from "@app/interfaces";
import { StoryCreateDto } from '../../apps/gateway/src/modules/story/dto';

const uri = baseUri + 'story/';

export const createStory = (token: string, dto: StoryCreateDto): Promise<AxiosResponse<Response<IStory>>> => {
    return axios.post(uri, dto, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const fetchStoriesWithPagination = (token : string, pagination : Pagination) : Promise<AxiosResponse<Response<PaginatedResponse<IStory>>>> => {
    return axios.get(uri, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params : pagination
    });
}

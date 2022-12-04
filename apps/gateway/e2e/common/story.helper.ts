import { baseUri } from './index';
import axios, { AxiosResponse } from 'axios';
import { Response } from '@app/interceptors';
import { IStory } from '@app/interfaces';
import { StoryCreateDto } from '../../src/modules/story/dto';

const uri = baseUri + 'story/';

export const createStory = (token: string, dto: StoryCreateDto): Promise<AxiosResponse<Response<IStory>>> => {
    return axios.post(uri, dto, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

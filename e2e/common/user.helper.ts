import { UserCreateDto } from '../../apps/gateway/src/modules/user/dto';
import { IUser } from '@app/interfaces/user.interface';
import { baseUri } from './index';
import axios, { AxiosResponse } from 'axios';
import { Response } from '@app/interceptors/transform.interceptor';

const uri = baseUri + 'user/';

export const createUser = (dto?: UserCreateDto): Promise<AxiosResponse<Response<IUser>>> => {
    if (!dto) {
        dto = {
            fullName: '#test-user',
            nickname: Math.random().toString(36).slice(2, 16),
            password: 'passw@rd'
        };
    }
    return axios.post(uri + 'create', dto);
};

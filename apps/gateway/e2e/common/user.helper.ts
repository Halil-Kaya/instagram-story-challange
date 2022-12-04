import { UserCreateDto } from '../../src/modules/user/dto';
import { IUser } from '@app/interfaces/user.interface';
import { baseUri } from './index';
import axios, { AxiosResponse } from 'axios';
import { Response } from '@app/interceptors/transform.interceptor';

const uri = baseUri + 'user/';

export const createUser = (dto: UserCreateDto): Promise<AxiosResponse<Response<IUser>>> => {
    return axios.post(uri + 'create', dto);
};

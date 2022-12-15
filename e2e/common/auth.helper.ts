import {baseUri} from './index';
import axios, {AxiosResponse} from 'axios';
import {Response} from '@app/interceptors/transform.interceptor';
import {LoginDto} from '../../apps/gateway/src/modules/auth/dto/login.dto';
import {LoginAck} from '@app/interfaces/login.ack.interface';
import {UserCreateDto} from "../../apps/gateway/src/modules/user/dto";
import {createUser} from "./user.helper";
const uri = baseUri + 'auth/';

export const login = (dto: LoginDto): Promise<AxiosResponse<Response<LoginAck>>> => {
    return axios.post(uri + 'login', dto);
};

export const logout = async (token: string): Promise<void> => {
    return axios.post(
        uri + 'logout',
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const loginWithTestUser = async (): Promise<string> => {
    const reqDto: UserCreateDto = {
        fullName: '#test-user',
        nickname: Math.random().toString(36).slice(2, 16),
        password: 'passw@rd',
    };
    await createUser(reqDto);
    const loginDto: LoginDto = {
        nickname: reqDto.nickname,
        password: reqDto.password,
    };
    const {data} = await login(loginDto);
    const {token} = data.result;
    return token
}
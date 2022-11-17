import {UserCreateDto} from "../../src/modules/user/dto";
import {IUser} from "@app/interfaces/user.interface";
import {baseUri} from "./index";
import axios, {AxiosResponse} from 'axios';

const uri = baseUri + "user/"

export const createUser = (dto: UserCreateDto): Promise<AxiosResponse<IUser>> => {
    return axios.post(uri + 'create', dto)
}
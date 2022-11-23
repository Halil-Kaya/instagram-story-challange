import {baseUri} from "./index";
import axios, {AxiosResponse} from 'axios';
import {Response} from "@app/interceptors/transform.interceptor";
import {LoginDto} from "../../src/modules/auth/dto/login.dto";
import {LoginAck} from "@app/interfaces/login.ack.interface";

const uri = baseUri + "auth/"

export const login = (dto: LoginDto): Promise<AxiosResponse<Response<LoginAck>>> => {
    return axios.post(uri + 'login', dto)
}
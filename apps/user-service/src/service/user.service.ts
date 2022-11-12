import {Injectable} from '@nestjs/common';
import {UserRepository} from "../repository/user.repository";
import * as UserServicePayloads from "../payload";
import {User} from "../model/user.model";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {
    }

    async create(payload: UserServicePayloads.Create): Promise<User> {
        const isNicknameExist = await this.userRepository.isExist({nickname: payload.nickname})
        if (isNicknameExist) {
            //TODO throw custom error
            throw new Error()
        }
        return this.userRepository.create(payload)
    }

    async getUserForLogin(_id: string): Promise<User> {
        return this.userRepository.getUserWithPasswordById(_id)
    }
}

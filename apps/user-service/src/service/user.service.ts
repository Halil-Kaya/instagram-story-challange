import {Injectable} from '@nestjs/common';
import {UserRepository} from "../repository/user.repository";
import * as UserServicePayloads from "../payload";
import {User} from "../model/user.model";
import {NicknameAlreadyTakenException} from "@app/exceptions";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {
    }

    async create(payload: UserServicePayloads.Create): Promise<User> {
        const isNicknameExist = await this.userRepository.isExist({nickname: payload.nickname})
        if (isNicknameExist) {
            throw new NicknameAlreadyTakenException()
        }
        return this.userRepository.create(payload)
    }

    async getUserForLogin(_id: string): Promise<User> {
        return this.userRepository.getUserWithPasswordById(_id)
    }
}

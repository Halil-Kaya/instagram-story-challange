import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from '../model/user.model';
import { NicknameAlreadyTakenException } from '@app/exceptions';
import { UserServicePayloads } from '@app/payloads';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(payload: UserServicePayloads.Create): Promise<User> {
        const isNicknameExist = await this.userRepository.isExist({ nickname: payload.nickname });
        if (isNicknameExist) {
            throw new NicknameAlreadyTakenException();
        }
        const createdUser = await this.userRepository.create(payload);
        return {
            _id: createdUser._id.toString(),
            nickname: createdUser.nickname,
            fullName: createdUser.fullName,
            password: createdUser.password,
            createdAt: createdUser.createdAt
        };
    }

    async getUserForLogin({ nickname }: UserServicePayloads.GetUserForLogin): Promise<User> {
        return this.userRepository.getUserWithPasswordByNickname(nickname);
    }
}

import {Inject, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {AuthServicePayloads, Services, UserServicePatterns, UserServicePayloads} from '@app/payloads';
import {LoginAck} from '@app/interfaces/login.ack.interface';
import {ClientProxy} from '@nestjs/microservices';
import {IUser} from '@app/interfaces/user.interface';
import {InvalidCredentialsException} from '@app/exceptions';
import * as bcrypt from 'bcryptjs';
import {firstValueFrom} from 'rxjs';
import {AuthCacheService} from '../repository/auth-cache.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(Services.USER_SERVICE) private userServiceClient: ClientProxy,
        private readonly authCacheRepository: AuthCacheService,
        private readonly jwtService: JwtService,
    ) {
    }

    async login({nickname, password}: AuthServicePayloads.LoginPayload): Promise<LoginAck> {
        const user = await firstValueFrom(
            this.userServiceClient.send<IUser, UserServicePayloads.GetUserForLogin>(
                UserServicePatterns.GET_USER_FOR_LOGIN,
                {
                    nickname,
                },
            ),
        );
        if (!user) {
            throw new InvalidCredentialsException();
        }
        const isPasswordMatch: boolean = await AuthService.checkPasswordMatch(password, user.password);
        if (!isPasswordMatch) {
            throw new InvalidCredentialsException();
        }
        delete user.password;
        await this.authCacheRepository.saveUser(user);
        return {
            token: this.jwtService.sign(this.getPayload(user)),
        };
    }

    async logout({_id}: AuthServicePayloads.LogoutPayload): Promise<void> {
        await this.authCacheRepository.removeUser(_id);
    }

    private getPayload(user: IUser): Pick<IUser, '_id'> {
        return {
            _id: user._id,
        };
    }

    private static checkPasswordMatch(password, realPassword): Promise<boolean> {
        return bcrypt.compare(password, realPassword);
    }
}

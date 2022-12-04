import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { IUser } from '@app/interfaces/user.interface';
import { ConfigService } from '@nestjs/config';
import { IEnvironment } from '../environment.interface';

@Injectable()
export class AuthCacheService {
    constructor(
        @InjectRedis() private readonly redis: Redis,
        private readonly configService: ConfigService<IEnvironment>,
    ) {}

    async saveUser(user: Omit<IUser, 'password'>): Promise<void> {
        const key = `user:${user._id}`;
        await this.redis.hset(key, user);
        await this.redis.expire(key, this.configService.get('REDIS_USER_EXPIRE'));
    }

    async removeUser(_id: string): Promise<void> {
        const key = `user:${_id}`;
        await this.redis.del(key);
    }
}

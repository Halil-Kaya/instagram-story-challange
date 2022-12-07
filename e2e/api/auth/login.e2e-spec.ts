import { UserCreateDto } from '../../../apps/gateway/src/modules/user/dto';
import { createUser } from '../../common/user.helper';
import { login } from '../../common/auth.helper';
import { LoginDto } from '../../../apps/gateway/src/modules/auth/dto/login.dto';
import { closeMongoDb, connectMongoDb } from '../../common/db/mongo.helper';
import { closeRedis, connectRedis, getRedis } from '../../common/db/redis.helper';
import { IUser } from '@app/interfaces/user.interface';
import { config } from '../../config';

afterAll(async () => {
    await Promise.all([closeMongoDb(), closeRedis()]);
});

beforeEach(async () => {
    await Promise.all([connectRedis(), connectMongoDb()]);
});

it('should login user', async () => {
    const reqDto: UserCreateDto = {
        fullName: '#test-user',
        nickname: Math.random().toString(36).slice(2, 16),
        password: 'passw@rd',
    };
    const result = await createUser(reqDto);
    const createdUser = <IUser>result.data.result;
    const loginDto: LoginDto = {
        nickname: reqDto.nickname,
        password: reqDto.password,
    };
    const { data } = await login(loginDto);
    const { token } = data.result;
    expect(token).toBeDefined();

    const redis = getRedis();
    const key = `user:${createdUser._id}`;
    const redisUser = await redis.hGetAll(key);
    expect(createdUser._id).toBe(redisUser._id);
    expect(createdUser.fullName).toBe(redisUser.fullName);
    expect(createdUser.nickname).toBe(redisUser.nickname);
    expect(createdUser.createdAt).toBe(redisUser.createdAt);
    const ttlTime = await redis.ttl(key);
    expect(ttlTime).toBeGreaterThan(config.redisUserExpireTime - 10);
});

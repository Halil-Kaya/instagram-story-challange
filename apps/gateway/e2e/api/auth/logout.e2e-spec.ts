import { UserCreateDto } from '../../../src/modules/user/dto';
import { createUser } from '../../common/user.helper';
import { login, logout } from '../../common/auth.helper';
import { LoginDto } from '../../../src/modules/auth/dto/login.dto';
import { closeMongoDb, connectMongoDb } from '../../common/db/mongo.helper';
import { closeRedis, connectRedis, getRedis } from '../../common/db/redis.helper';
import { IUser } from '@app/interfaces/user.interface';

afterAll(async () => {
    await Promise.all([closeMongoDb(), closeRedis()]);
});

beforeEach(async () => {
    await Promise.all([connectRedis(), connectMongoDb()]);
});

it('should logout user', async () => {
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
    const redis = getRedis();
    const key = `user:${createdUser._id}`;
    let isUserExistInRedis = await redis.exists(key);
    expect(isUserExistInRedis).toBe(1);
    await logout(token);
    isUserExistInRedis = await redis.exists(key);
    expect(isUserExistInRedis).toBe(0);
});

import { UserCreateDto } from '../../../apps/gateway/src/modules/user/dto';
import { createUser } from '../../common/user.helper';
import { IUser } from '@app/interfaces/user.interface';
import { MetaInterface } from '@app/interceptors';
import { ErrorCodes } from '@app/exceptions/error-codes';
import { closeMongoDb, connectMongoDb } from '../../common/db/mongo.helper';
import { closeRedis, connectRedis } from '../../common/db/redis.helper';

afterAll(async () => {
    await Promise.all([closeMongoDb(), closeRedis()]);
});

beforeEach(async () => {
    await Promise.all([connectRedis(), connectMongoDb()]);
});

it('should create user', async () => {
    const reqDto: UserCreateDto = {
        fullName: '#test-user',
        nickname: Math.random().toString(36).slice(2, 16),
        password: 'passw@rd',
    };
    const { data } = await createUser(reqDto);
    const user = <IUser>data.result;
    expect(user._id).toBeDefined();
    expect(user.fullName).toBe(reqDto.fullName);
    expect(user.nickname).toBe(reqDto.nickname);
    expect(user.createdAt).toBeDefined();
});

it('should throw nickname is already taken error', async () => {
    const reqDto: UserCreateDto = {
        fullName: '#test-user',
        nickname: Math.random().toString(36).slice(2, 16),
        password: 'passw@rd',
    };
    await createUser(reqDto);

    try {
        await createUser(reqDto);
    } catch (err) {
        const result = <MetaInterface>err.response.data.meta;
        expect(result.errorCode).toBe(ErrorCodes.NICKNAME_ALREADY_TAKEN);
    }
});

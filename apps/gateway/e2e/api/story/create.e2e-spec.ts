import {closeMongoDb, connectMongoDb} from "../../common/db/mongo.helper";
import {closeRedis, connectRedis} from "../../common/db/redis.helper";
import {UserCreateDto} from "../../../src/modules/user/dto";
import {LoginDto} from "../../../src/modules/auth/dto/login.dto";
import {login} from "../../common/auth.helper";
import {createStory} from "../../common/story.helper";
import {StoryCreateDto} from "../../../src/modules/story/dto";
import {createUser} from "../../common/user.helper";
import {closePostgresqlDb, connectPostgresqlDb} from "../../common/db/postgresql.helper";
import {IStory, IUser} from "@app/interfaces";

afterAll(async () => {
    await Promise.all([
        closeMongoDb(),
        closeRedis(),
        closePostgresqlDb()
    ])
})

beforeEach(async () => {
    await Promise.all([
        connectRedis(),
        connectMongoDb(),
        connectPostgresqlDb()
    ])
})

it('should create story', async () => {
    const reqDto: UserCreateDto = {
        fullName: '#test-user',
        nickname: Math.random().toString(36).slice(2, 16),
        password: 'passw@rd'
    }
    const {data: createUserResponse} = await createUser(reqDto)
    const createdUser = <IUser>createUserResponse.result
    const loginDto: LoginDto = {
        nickname: reqDto.nickname,
        password: reqDto.password
    }
    const {data} = await login(loginDto)
    const {token} = data.result
    const createStoryDto: StoryCreateDto = {
        content: 'test-content',
        title: 'test-title'
    }
    const {data: response} = await createStory(token, createStoryDto)
    const createdStory = <IStory>response.result
    expect(createdStory.id).toBeDefined()
    expect(typeof createdStory.id).toBe('string')
    expect(createdStory.userId).toBe(createdUser._id)
    expect(createdStory.content).toBe(createStoryDto.content)
    expect(createdStory.title).toBe(createStoryDto.title)
    expect(createdStory.createdAt).toBeDefined()
});
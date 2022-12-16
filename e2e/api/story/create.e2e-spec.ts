import { closeMongoDb, connectMongoDb } from '../../common/db/mongo.helper';
import { closeRedis, connectRedis } from '../../common/db/redis.helper';
import { UserCreateDto } from '../../../apps/gateway/src/modules/user/dto';
import { LoginDto } from '../../../apps/gateway/src/modules/auth/dto/login.dto';
import { login, loginWithTestUser } from '../../common/auth.helper';
import { createStory } from '../../common/story.helper';
import { StoryCreateDto } from '../../../apps/gateway/src/modules/story/dto';
import { createUser } from '../../common/user.helper';
import { closePostgresqlDb, connectPostgresqlDb, runPostgresqlQuery } from '../../common/db/postgresql.helper';
import { IStory, IUser } from '@app/interfaces';
import { getJobById, runJob } from '../../common/db/queue.helper';
import { DeleteStoryJob, JobQueues } from '../../../apps/queue-service/src/jobs';
import { config } from '../../config';
import { sleep } from '../../common';

afterAll(async () => {
    await Promise.all([closeMongoDb(), closeRedis(), closePostgresqlDb()]);
});

beforeEach(async () => {
    await Promise.all([connectRedis(), connectMongoDb(), connectPostgresqlDb()]);
});

it('should create story', async () => {
    const reqDto: UserCreateDto = {
        fullName: '#test-user',
        nickname: Math.random().toString(36).slice(2, 16),
        password: 'passw@rd'
    };
    const { data: createUserResponse } = await createUser(reqDto);
    const createdUser = <IUser>createUserResponse.result;
    const loginDto: LoginDto = {
        nickname: reqDto.nickname,
        password: reqDto.password
    };
    const { data } = await login(loginDto);
    const { token } = data.result;
    const createStoryDto: StoryCreateDto = {
        content: 'test-content',
        title: 'test-title'
    };
    const { data: response } = await createStory(token, createStoryDto);
    const createdStory = <IStory>response.result;
    expect(createdStory.id).toBeDefined();
    expect(typeof createdStory.id).toBe('string');
    expect(createdStory.userId).toBe(createdUser._id);
    expect(createdStory.content).toBe(createStoryDto.content);
    expect(createdStory.title).toBe(createStoryDto.title);
    expect(createdStory.createdAt).toBeDefined();
});

it('should story remove after job finished', async () => {
    const token = await loginWithTestUser();
    const createStoryDto: StoryCreateDto = {
        content: 'test-content',
        title: 'test-title'
    };
    const { data: response } = await createStory(token, createStoryDto);
    const createdStory = <IStory>response.result;
    const job = await getJobById<DeleteStoryJob>(JobQueues.STORY, createdStory.id);
    expect(job).toBeDefined();
    expect(job.opts.delay).toBeGreaterThan(config.storyQueue.delayTimeForDeleteStoryJob - 5);
    expect(job.opts.removeOnFail).toBeTruthy();
    expect(job.opts.removeOnComplete).toBeTruthy();
    expect(job.data).toBeDefined();
    expect(job.data.id).toBe(createdStory.id);
    await runJob(job);
    await sleep(100);
    const result = await runPostgresqlQuery<IStory>(`SELECT * FROM story WHERE id=${createdStory.id}`);
    const storyInDb = result.rows[0];
    expect(storyInDb).toBeUndefined();
});

it('should create stories without race condition', async () => {
    const token = await loginWithTestUser();
    await Promise.all(
        new Array(50).fill(0).map(async () => {
            const createStoryDto: StoryCreateDto = {
                content: 'test-content',
                title: 'test-title'
            };
            const { data: response } = await createStory(token, createStoryDto);
            const createdStory = <IStory>response.result;
            await sleep(100);
            const job = await getJobById<DeleteStoryJob>(JobQueues.STORY, createdStory.id);
            expect(job).toBeDefined();
            expect(job.opts.delay).toBeGreaterThan(config.storyQueue.delayTimeForDeleteStoryJob - 5);
            expect(job.opts.removeOnFail).toBeTruthy();
            expect(job.opts.removeOnComplete).toBeTruthy();
            expect(job.data).toBeDefined();
            expect(job.data.id).toBe(createdStory.id);
            await runJob(job);
        })
    );
    await sleep(100);
    const result = await runPostgresqlQuery<IStory>(`SELECT * FROM story`);
    expect(result.rows.length).toBe(0);
});

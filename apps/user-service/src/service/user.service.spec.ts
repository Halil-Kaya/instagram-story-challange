import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import { postFindOne, preSave, User, UserSchema } from '../model/user.model';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserRepository } from '../repository/user.repository';
import { UserServicePayloads } from '@app/payloads';
import * as bcrypt from 'bcryptjs';
import { NicknameAlreadyTakenException } from '@app/exceptions';

describe('UserService', () => {
    let mockUserService: UserService;
    let mongod: MongoMemoryServer;
    let mongoConnection: Connection;
    let mockUserModel: Model<User>;

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        mongoConnection = (await connect(uri)).connection;
        UserSchema.pre('save', preSave);
        UserSchema.post('findOne', postFindOne);
        mockUserModel = mongoConnection.model(User.name, UserSchema);
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                UserRepository,
                {
                    provide: getModelToken(User.name),
                    useValue: mockUserModel,
                },
            ],
        }).compile();
        mockUserService = module.get<UserService>(UserService);
    });

    afterAll(async () => {
        await mongoConnection.dropDatabase();
        await mongoConnection.close();
        await mongod.stop();
    });

    afterEach(async () => {
        const collections = mongoConnection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    });

    it('should be defined', () => {
        expect(mockUserService).toBeDefined();
    });

    describe('create', () => {
        it('should create user', async () => {
            const reqDto: UserServicePayloads.Create = {
                fullName: 'test-user',
                nickname: 'test-nickname',
                password: '12345678',
            };
            const createdUser = await mockUserService.create(reqDto);
            expect(createdUser._id).toBeDefined();
            expect(createdUser.nickname).toBe(reqDto.nickname);
            expect(createdUser.fullName).toBe(reqDto.fullName);
            expect(await bcrypt.compare(reqDto.password, createdUser.password)).toBeTruthy();
        });

        it('should throw NicknameAlreadyTakenException', async () => {
            const reqDto: UserServicePayloads.Create = {
                fullName: 'test-user',
                nickname: 'test-nickname',
                password: '12345678',
            };
            await mockUserService.create(reqDto);
            try {
                await mockUserService.create(reqDto);
            } catch (err) {
                expect(err).toBeInstanceOf(NicknameAlreadyTakenException);
            }
        });
    });

    describe('getUserForLogin', () => {
        it('should get user with password field', async () => {
            const reqDto: UserServicePayloads.Create = {
                fullName: 'test-user',
                nickname: 'test-nickname',
                password: '12345678',
            };
            const { nickname } = await mockUserService.create(reqDto);
            const user = await mockUserService.getUserForLogin({ nickname });
            expect(user._id).toBeDefined();
            expect(user.nickname).toBe(reqDto.nickname);
            expect(user.fullName).toBe(reqDto.fullName);
            expect(await bcrypt.compare(reqDto.password, user.password)).toBeTruthy();
        });
    });
});

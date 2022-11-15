import {UserRepository} from "./user.repository";
import {Test, TestingModule} from "@nestjs/testing";
import {getModelToken} from "@nestjs/mongoose";
import {postFindOne, preSave, User, UserSchema} from "../model/user.model";
import {connect, Connection, Model, Types} from "mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";
import * as bcrypt from 'bcryptjs';

describe('UserRepository', () => {
    let userRepository: UserRepository
    let mongod: MongoMemoryServer;
    let mongoConnection: Connection;
    let mockUserModel: Model<User>;

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        mongoConnection = (await connect(uri)).connection;
        UserSchema.pre('save', preSave);
        UserSchema.post('findOne', postFindOne)
        mockUserModel = mongoConnection.model(User.name, UserSchema)
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserRepository,
                {
                    provide: getModelToken(User.name),
                    useValue: mockUserModel
                }
            ]
        }).compile()
        userRepository = module.get<UserRepository>(UserRepository)
    })

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
        expect(userRepository).toBeDefined()
    });

    describe('create', () => {
        it('should create user', async () => {
            const createUserDto = {
                fullName: 'halil kaya',
                password: '12345678',
                nickname: 'hlk'
            }
            const createdUser = await userRepository.create(createUserDto)
            expect(createdUser._id).toBeDefined()
            expect(createdUser.nickname).toBe(createUserDto.nickname)
            expect(createdUser.fullName).toBe(createUserDto.fullName)
            expect(await bcrypt.compare(createUserDto.password, createdUser.password)).toBeTruthy()
        });
        it('should throw error if nickname is already taken', async () => {
            await userRepository.create({
                fullName: 'halil kaya',
                password: '12345678',
                nickname: 'hlk'
            })
            try {
                await userRepository.create({
                    fullName: 'halil kaya',
                    password: '12345678',
                    nickname: 'hlk'
                })
            } catch (err) {
                expect(err.message).toBe('Already exists error')
            }
        });
        it("should password's length more than 8 ", async () => {
            try {
                await userRepository.create({
                    fullName: 'halil kaya',
                    password: '123',
                    nickname: 'hlk#1'
                })
            } catch (err) {
                expect(err._message).toBe("User validation failed")
            }
        });
        it("should password's length less than 24 ", async () => {
            try {
                await userRepository.create({
                    fullName: 'halil kaya',
                    password: '1231231232132132132132131231231231232121',
                    nickname: 'hlk#2'
                })
            } catch (err) {
                expect(err._message).toBe("User validation failed")
            }
        });
    })
    describe('isExist', () => {
        it('should return true for exist user', async () => {

            const createdUser = await userRepository.create({
                fullName: 'halil kaya',
                password: '12345678',
                nickname: 'hlk#3'
            })
            const result = await userRepository.isExist({_id: createdUser._id})
            expect(result).toBeTruthy()
        });
        it('should return false for non-exist user', async () => {
            const result = await userRepository.isExist({_id: new Types.ObjectId()})
            expect(result).toBeFalsy()
        })
    })
    describe('getUserWithPasswordById', () => {
        it('should return user with password field', async () => {
            const createUserDto = {
                fullName: 'halil kaya',
                password: '12345678',
                nickname: 'hlk#4'
            }
            const {_id} = await userRepository.create(createUserDto)
            const user = await userRepository.getUserWithPasswordById(_id)
            expect(typeof user._id).toBe('string')
            expect(await bcrypt.compare(createUserDto.password, user.password)).toBeTruthy()
        })
    })
})
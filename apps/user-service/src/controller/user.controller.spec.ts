import {UserController} from "./user.controller";
import {UserService} from "../service/user.service";
import {Test, TestingModule} from "@nestjs/testing";
import {UserRepository} from "../repository/user.repository";
import {IUser} from "@app/interfaces/user.interface";
import {Types} from "mongoose";
import {getModelToken} from "@nestjs/mongoose";
import {User} from "../model/user.model";
import {NicknameAlreadyTakenException} from "@app/exceptions";

describe('UserController', () => {
    let mockUserController: UserController
    let mockUserService: UserService
    const mockUserModel: IUser = {
        _id: new Types.ObjectId().toString(),
        fullName: 'halil-kaya',
        nickname: 'hlk',
        password: 'password',
        createdAt: new Date()
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                UserRepository,
                UserController,
                {
                    provide: getModelToken(User.name),
                    useValue: mockUserModel
                }
            ]
        }).compile()
        mockUserController = module.get<UserController>(UserController)
        mockUserService = module.get<UserService>(UserService)
    })

    it('should defined', () => {
        expect(mockUserController).toBeDefined()
        expect(mockUserService).toBeDefined()
    });

    describe('create', () => {
        it('should create user ', async () => {
            const mockResult = {
                _id: new Types.ObjectId().toString(),
                fullName: 'halil-kaya',
                nickname: 'hlk',
                password: 'password',
                createdAt: new Date()
            }
            const mock = await jest.spyOn(mockUserService, 'create')
            mock.mockImplementation(() => Promise.resolve(mockResult))
            const reqDto = {
                fullName: 'halil-kaya',
                nickname: 'hlk',
                password: 'password',
            }
            expect(await mockUserController.create(reqDto)).toBe(mockResult)
        })

        it('should throw nickname is already taken error', async () => {
            const mock = await jest.spyOn(mockUserService, 'create')
            mock.mockImplementation(() => {
                throw new NicknameAlreadyTakenException()
            })
            const reqDto = {
                fullName: 'halil-kaya',
                nickname: 'hlk',
                password: 'password',
            }
            try {
                await mockUserController.create(reqDto)
            } catch (err) {
                expect(err).toBeInstanceOf(NicknameAlreadyTakenException)
            }
        })
    });

    describe('getUserForLogin', () => {
        it('should get user with password field', async () => {
            const mockResult = {
                _id: new Types.ObjectId().toString(),
                fullName: 'halil-kaya',
                nickname: 'hlk',
                password: 'password',
                createdAt: new Date()
            }
            const mock = await jest.spyOn(mockUserService, 'getUserForLogin')
            mock.mockImplementation(() => Promise.resolve(mockResult))

            const result = await mockUserController.getUserForLogin({nickname: mockResult._id})
            expect(result.password).toBeDefined()
        });
    })
})
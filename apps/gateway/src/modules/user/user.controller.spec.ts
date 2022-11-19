import {UserController} from "./user.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {ClientProxy, ClientsModule, Transport} from "@nestjs/microservices";
import {Types} from "mongoose";
import {firstValueFrom, of, throwError} from "rxjs";
import {UserCreateDto} from "./dto";
import {NicknameAlreadyTakenException} from "@app/exceptions";

describe('UserController', () => {
    let mockUserController: UserController
    let mockUserServiceClient: ClientProxy

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ClientsModule.register([
                    {
                        name: 'USER_SERVICE',
                        transport: Transport.TCP,
                        options: {
                            host: 'user-service'
                        }
                    },
                ]),
            ],
            controllers: [UserController]
        }).compile()
        mockUserController = module.get<UserController>(UserController)
        mockUserServiceClient = module.get<ClientProxy>('USER_SERVICE')
    })

    it('should be defined', () => {
        expect(mockUserController).toBeDefined()
        expect(mockUserServiceClient).toBeDefined()
    });

    describe('create', () => {

        it('should create user', async () => {
            const mockResult = {
                _id: new Types.ObjectId().toString(),
                fullName: 'halil-kaya',
                nickname: 'hlk',
                password: 'password',
                createdAt: new Date()
            }
            const mock = await jest.spyOn(mockUserServiceClient, 'send')
            mock.mockImplementation(() => of(mockResult))
            const reqDto: UserCreateDto = {
                fullName: mockResult.fullName,
                nickname: mockResult.nickname,
                password: mockResult.password
            }
            const user = await firstValueFrom(mockUserController.create(reqDto))
            expect(user._id).toBeDefined()
            expect(user.fullName).toBe(reqDto.fullName)
            expect(user.nickname).toBe(reqDto.nickname)
            expect(user.password).toBe(reqDto.password)
            expect(user.createdAt).toBeDefined()
        });

        it('should throw nickname is already taken error', async () => {
            const mock = await jest.spyOn(mockUserServiceClient, 'send')
            mock.mockImplementation(() => throwError(new NicknameAlreadyTakenException()))
            const reqDto: UserCreateDto = {
                fullName: 'halil-kaya',
                nickname: 'hlk',
                password: 'p@ssword'
            }
            try {
                await firstValueFrom(mockUserController.create(reqDto))
            } catch (err) {
                expect(err).toBeInstanceOf(NicknameAlreadyTakenException)
            }
        })
    })
})
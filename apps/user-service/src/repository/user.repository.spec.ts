import {UserRepository} from "./user.repository";
import {Test, TestingModule} from "@nestjs/testing";
import {getModelToken} from "@nestjs/mongoose";
import {User} from "../model/user.model";

describe('UserRepository', () => {
    let userRepository: UserRepository

    class mockUserModel {
        _id: string;
        fullName: string;
        nickname: string;
        password: string;
        createdAt: Date;

        constructor(dto: any) {
            this._id = dto._id
            this.fullName = dto.fullName;
            this.nickname = dto.nickname;
            this.password = dto.password;
        }

        static db = []

        save() {
            if (!this._id) {
                this._id = (mockUserModel.db.length + 1).toString();
            }
            if (mockUserModel.db.some(usr => usr.nickname == this.nickname)) {
                throw new Error('Already exists error');
            }
            if (this.password.length < 8) {
                throw new Error("Password's length should be more than 8");
            }
            if (this.password.length > 24) {
                throw new Error("Password's length should be less than 24");
            }
            const dbRecordIndex = mockUserModel.db.findIndex(
                (x) => x.nickname === this.nickname,
            );
            if (dbRecordIndex === -1) mockUserModel.db.push(this);
            else mockUserModel.db[dbRecordIndex] = this;
            return this;
        }

    }

    beforeEach(async () => {
        mockUserModel.db = []
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

    it('should be defined', () => {
        expect(userRepository).toBeDefined()
    });

    describe('create', () => {
        it('should create user', async () => {
            const expectedId = (mockUserModel.db.length + 1).toString();
            const createdUser = await userRepository.create({
                fullName: 'halil kaya',
                password: '12345678',
                nickname: 'hlk'
            })
            expect(createdUser._id).toBe(expectedId)
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
                    nickname: 'hlk'
                })
            } catch (err) {
                expect(err.message).toBe("Password's length should be more than 8")
            }
        });
        it("should password's length less than 24 ", async () => {
            try {
                await userRepository.create({
                    fullName: 'halil kaya',
                    password: '1231231232132132132132131231231231232121',
                    nickname: 'hlk'
                })
            } catch (err) {
                expect(err.message).toBe("Password's length should be less than 24")
            }
        });
    })
})
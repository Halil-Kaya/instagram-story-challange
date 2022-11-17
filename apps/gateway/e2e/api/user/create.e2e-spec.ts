import {UserCreateDto} from "../../../src/modules/user/dto";
import {createUser} from "../../common/user.helper";

it('should create user', async () => {
    const reqDto: UserCreateDto = {
        fullName: 'halil-kaya',
        nickname: Math.random().toString(36).slice(2, 16),
        password: 'passw@rd'
    }
    const {data: user} = await createUser(reqDto)
    console.log(user)
    expect(user._id).toBeDefined()
    expect(user.fullName).toBe(reqDto.fullName)
    expect(user.nickname).toBe(reqDto.nickname)
    expect(user.createdAt).toBeDefined()
});

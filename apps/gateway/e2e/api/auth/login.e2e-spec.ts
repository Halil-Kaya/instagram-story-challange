import {UserCreateDto} from "../../../src/modules/user/dto";
import {createUser} from "../../common/user.helper";
import {login} from "../../common/auth.helper";
import {LoginDto} from "../../../src/modules/auth/dto/login.dto";

it('should create user', async () => {
    const reqDto: UserCreateDto = {
        fullName: '#test-user',
        nickname: Math.random().toString(36).slice(2, 16),
        password: 'passw@rd'
    }
    await createUser(reqDto)
    const loginDto: LoginDto = {
        nickname: reqDto.nickname,
        password: reqDto.password
    }
    const {data} = await login(loginDto)
    const {token} = data.result
    expect(token).toBeDefined()
});
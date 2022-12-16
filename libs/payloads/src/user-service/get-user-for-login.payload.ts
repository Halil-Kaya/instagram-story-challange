import { IsString } from 'class-validator';

export class GetUserForLogin {
    @IsString()
    nickname: string;
}

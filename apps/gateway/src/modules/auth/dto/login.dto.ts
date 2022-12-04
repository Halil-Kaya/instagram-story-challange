import { IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    nickname: string;
    @IsString()
    password: string;
}

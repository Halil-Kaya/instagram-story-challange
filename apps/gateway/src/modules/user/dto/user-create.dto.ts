import { IsString, MaxLength, MinLength } from 'class-validator';

export class UserCreateDto {
    @MinLength(3)
    @MaxLength(24)
    @IsString()
    fullName: string;

    @IsString()
    @MinLength(3)
    @MaxLength(24)
    nickname: string;

    @IsString()
    @MinLength(8)
    @MaxLength(24)
    password: string;
}

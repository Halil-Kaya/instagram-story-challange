import { IsString, MaxLength, MinLength } from "class-validator";

export class Login {
    @IsString()
    nickname: string;

    @IsString()
    @MinLength(4)
    @MaxLength(32)
    password: string;
}

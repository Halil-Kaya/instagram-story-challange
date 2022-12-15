import { IsString } from "class-validator";

export class Create {
  @IsString()
  fullName: string;

  @IsString()
  nickname: string;

  @IsString()
  password: string;
}


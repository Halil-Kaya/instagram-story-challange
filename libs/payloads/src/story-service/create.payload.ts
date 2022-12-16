import { IsMongoId, IsString, MinLength } from 'class-validator';

export class Create {
    @IsString()
    @MinLength(2)
    title: string;

    @IsString()
    @MinLength(2)
    content: string;

    @IsString()
    @IsMongoId()
    userId: string;
}

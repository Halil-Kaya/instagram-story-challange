import { IsString, MaxLength, MinLength } from 'class-validator';

export class StoryCreateDto {
    @MinLength(1)
    @MaxLength(24)
    @IsString()
    title: string;

    @MinLength(1)
    @MaxLength(24)
    @IsString()
    content: string;
}

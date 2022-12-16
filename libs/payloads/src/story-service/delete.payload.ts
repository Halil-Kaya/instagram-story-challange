import { IsString } from 'class-validator';

export class Delete {
    @IsString()
    id: string;
}

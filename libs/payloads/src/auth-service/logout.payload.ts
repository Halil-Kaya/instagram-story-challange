import { IsMongoId } from 'class-validator';

export class Logout {
    @IsMongoId()
    _id: string;
}

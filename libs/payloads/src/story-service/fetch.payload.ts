import { Pagination } from '@app/interfaces/pagination.interface';
import { IsMongoId } from 'class-validator';

export class Fetch {
    @IsMongoId()
    userId: string;
    pagination: Pagination;
}

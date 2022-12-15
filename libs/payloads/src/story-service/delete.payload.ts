import { IsMongoId } from "class-validator";

export class Delete {
    @IsMongoId()
    id : string
}
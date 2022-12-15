import { IsString } from "class-validator";

export class AddToQueue {
    @IsString()
    id: string;
}
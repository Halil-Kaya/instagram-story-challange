import {IUser} from "@app/interfaces/user.interface";

export class User implements IUser {
    _id: string;
    fullName: string;
    nickname: string;
    password: string
}
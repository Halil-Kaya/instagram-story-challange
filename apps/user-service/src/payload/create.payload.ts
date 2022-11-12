import {IUser} from "@app/interfaces/user.interface";

export type Create = Omit<IUser, '_id' | 'createdAt'>
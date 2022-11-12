import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../model/user.model";
import {Model} from "mongoose";
import * as UserPayload from "../payload";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
    }

    create(payload: UserPayload.Create) {
        const user = new this.userModel(payload)
        return user.save()
    }
}

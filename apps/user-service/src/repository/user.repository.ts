import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../model/user.model";
import {FilterQuery, Model} from "mongoose";
import {UserServicePayloads} from "@app/payloads"

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
    }

    create(payload: UserServicePayloads.Create): Promise<User> {
        const user = new this.userModel(payload)
        return user.save()
    }

    async getUserWithPasswordById(_id: string): Promise<User> {
        return this.userModel.findById(_id)
            .select('+password')
            .lean()
            .exec()
    }

    async isExist(query: FilterQuery<UserDocument>): Promise<number> {
        return this.userModel.count(query).exec()
    }
}

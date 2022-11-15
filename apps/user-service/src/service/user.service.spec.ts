import {MongoMemoryServer} from "mongodb-memory-server";
import {Connection, Model} from "mongoose";
import {User} from "../model/user.model";
import {UserService} from "./user.service";

describe('UserService', async () => {
    let mockUserService: UserService
    let mongod: MongoMemoryServer;
    let mongoConnection: Connection;
    let mockUserModel: Model<User>;


});
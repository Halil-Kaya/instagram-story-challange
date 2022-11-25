import mongoose from "mongoose";
import {config} from "../config";

export const mongoDb = mongoose.connection;
mongoose.connect(config.mongoConnectionUrl);

export const resetMongoDb = async (): Promise<void> => {
    await Promise.all([
        mongoDb.collection('users').deleteMany({})
    ])
}

export const closeMongoDb = async (): Promise<void> => {
    await mongoDb.close()
}
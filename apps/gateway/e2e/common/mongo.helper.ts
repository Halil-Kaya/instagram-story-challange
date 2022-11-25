import mongoose from "mongoose";
import {config} from "../config";

export const mongoDb = mongoose.connection;

export const connectMongoDb = async (): Promise<void> => {
    await mongoose.connect(config.mongoConnectionUrl);
    await resetMongoDb()
}

export const resetMongoDb = async (): Promise<void> => {
    await Promise.all([
        mongoDb.collection('users').deleteMany({})
    ])
}

export const closeMongoDb = async (): Promise<void> => {
    await mongoDb.close()
}
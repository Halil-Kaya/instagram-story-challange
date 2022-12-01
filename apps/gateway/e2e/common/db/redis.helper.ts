import {createClient} from 'redis';
import {config} from "../../config";

const client = createClient({
    url: config.redisConnectionUrl
});

client.on('error', (err) => console.log('Redis Client Error', err));

export const connectRedis = async (): Promise<void> => {
    await client.connect();
    await resetCache()
}

export const closeRedis = async (): Promise<void> => {
    await client.disconnect()
}

export const resetCache = async () => {
    await client.flushAll()
}

export const getRedis =  () => {
    return client
}
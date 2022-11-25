import {createClient} from 'redis';
import {config} from "../config";

const client = createClient({
    url: config.redisConnectionUrl
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

export const resetCache = async () => {
    await client.flushAll()
    await client.disconnect();
}

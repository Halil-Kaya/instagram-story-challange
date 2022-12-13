export const config = {
    mongoConnectionUrl: 'mongodb://localhost:27016/isc',
    redisConnectionUrl: 'redis://localhost:6378',
    redisUserExpireTime: 2592000,
    postgresql: {
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'isc',
    },
    storyQueue: {
        delayTimeForDeleteStoryJob: 24000
    },
    redis: {
        host: 'localhost',
        port: 6378
    }
};

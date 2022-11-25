export interface IEnvironment {
    JWT_SECRET: string;
    JWT_EXPIRES: string;
    JWT_ALGORITHM: string;
    REDIS_HOST: string;
    REDIS_PORT: number;
    REDIS_USER_EXPIRE: number;
}
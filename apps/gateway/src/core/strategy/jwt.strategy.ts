import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt';
import {InvalidCredentialsException} from "@app/exceptions";
import {StrategyType} from "./strategy-types.enum";
import {IUser} from "@app/interfaces/user.interface";
import {ConfigService} from "@nestjs/config";
import {IEnvironment} from "../../environment.interface";
import {InjectRedis, Redis} from "@nestjs-modules/ioredis";

@Injectable()
export class JWTStrategy
    extends PassportStrategy(Strategy, StrategyType.JWT) {

    constructor(@InjectRedis() private readonly redis: Redis,
                private readonly configService: ConfigService<IEnvironment>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET')
        });
    }

    async validate(payload: Pick<IUser, '_id'>, done: Function) {
        try {
            const key = `user:${payload._id}`
            const user = await this.redis.hgetall(key)
            if (!user) {
                throw new InvalidCredentialsException()
            }
            return done(null, user);
        } catch (err) {
            return done(new InvalidCredentialsException(), null);
        }
    }
}
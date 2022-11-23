import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {AuthServicePayloads} from "@app/payloads"
import {LoginAck} from "@app/interfaces/login.ack.interface";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {
    }

    async login(payload: AuthServicePayloads.LoginPayload): Promise<LoginAck> {
        return {
            token: ''
        }
    }
}
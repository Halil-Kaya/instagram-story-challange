import * as UserServicePayloads from './user-service'
import * as AuthServicePayloads from './auth-service'

export {
    UserServicePayloads,
    AuthServicePayloads
}

export enum UserServicePatterns {
    CREATE = "create",
    GET_USER_FOR_LOGIN = "get-user-for-login"
}

export enum AuthServicePatterns {
    LOGIN = "login"
}
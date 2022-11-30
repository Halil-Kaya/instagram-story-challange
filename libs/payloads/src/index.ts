import * as UserServicePayloads from './user-service'
import * as AuthServicePayloads from './auth-service'
import * as StoryServicePayloads from './story-service'

export {
    UserServicePayloads,
    AuthServicePayloads,
    StoryServicePayloads
}

export enum UserServicePatterns {
    CREATE = "create",
    GET_USER_FOR_LOGIN = "get-user-for-login"
}

export enum AuthServicePatterns {
    LOGIN = "login",
    LOGOUT = "logout"
}

export enum StoryServicePatterns {
    CREATE = 'create'
}

export enum Services {
    AUTH_SERVICE = 'AUTH_SERVICE',
    STORY_SERVICE = 'STORY_SERVICE',
    USER_SERVICE = 'USER_SERVICE'
}
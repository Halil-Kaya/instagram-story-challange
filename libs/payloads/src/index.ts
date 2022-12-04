import * as UserServicePayloads from './user-service'
import * as AuthServicePayloads from './auth-service'
import * as StoryServicePayloads from './story-service'
import * as QueueServicePayloads from './queue-service'

export {
    UserServicePayloads,
    AuthServicePayloads,
    StoryServicePayloads,
    QueueServicePayloads
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

export enum QueueServicePatterns {
    ADD_TO_QUEUE = 'add-to-queue'
}

export enum Services {
    AUTH_SERVICE = 'AUTH_SERVICE',
    STORY_SERVICE = 'STORY_SERVICE',
    USER_SERVICE = 'USER_SERVICE',
    QUEUE_SERVICE = 'QUEUE_SERVICE'
}
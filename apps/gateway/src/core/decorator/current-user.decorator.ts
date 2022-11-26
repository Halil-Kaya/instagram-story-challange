import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {IUser} from "@app/interfaces/user.interface";

export const CurrentUser = createParamDecorator(
    (data: string, ctx: ExecutionContext): IUser => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);
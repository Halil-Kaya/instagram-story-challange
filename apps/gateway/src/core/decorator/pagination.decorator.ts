import { Pagination } from "@app/interfaces/pagination.interface";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Paginate = createParamDecorator(
    (data: string, ctx: ExecutionContext): Pagination => {
        const request = ctx.switchToHttp().getRequest();

        const page = request.body.page
            ? parseInt(request.body.page)
            : request.query.page
                ? parseInt(request.query.page)
                : 0;

        const limit = request.body.limit
            ? parseInt(request.body.limit)
            : request.query.limit
                ? parseInt(request.query.limit)
                : undefined;
        return {
            offset : page * limit < 0 ? 0 : page * limit,
            limit  : limit <= 0 || limit > 5 ? 5 : limit,
            page   : page,
            current: page
        };
    },
);
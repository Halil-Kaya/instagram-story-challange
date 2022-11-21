import {CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor} from "@nestjs/common";
import {Observable, tap} from "rxjs";

@Injectable()
export class RpcLoggerInterceptor implements NestInterceptor {
    private logger = new Logger('Microservice');

    intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
        const reqBody = context.switchToRpc().getData();
        const method = context.getHandler().name;
        const contextType = context.getType();
        const controllerName = context.getClass().name;
        const reqId = (Math.random() + 1).toString(36).substring(2);
        this.logger.log(
            `REQ:[${reqId}] [${contextType}]:[${controllerName}]:[${method}]:-> ${JSON.stringify(
                reqBody,
            )}`,
        );
        return next.handle().pipe(
            tap((data) => {
                this.logger.log(
                    `RES:[${reqId}] [${contextType}]:[${controllerName}]:[${method}]:-> ${JSON.stringify(
                        data,
                    )}`,
                );
            }),
        );
    }
}
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { maskHelper } from '@app/interceptors/mask.helper';

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
                maskHelper(reqBody, ['password'])
            )}`
        );
        return next.handle().pipe(
            tap((data) => {
                this.logger.log(
                    `RES:[${reqId}] [${contextType}]:[${controllerName}]:[${method}]:-> ${JSON.stringify(
                        maskHelper(data, ['password'])
                    )}`
                );
            })
        );
    }
}

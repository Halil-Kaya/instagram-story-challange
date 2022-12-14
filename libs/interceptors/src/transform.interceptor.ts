import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { maskHelper } from '@app/interceptors/mask.helper';

export interface MetaInterface {
    headers: any;
    params: any;
    status: boolean;
    errorCode?: string;
    timestamp: Date;
    requestId: string;
}

export interface Response<T> {
    meta: MetaInterface;
    result: T;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    private logger = new Logger('HTTP');

    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<any>> {
        const request = context.switchToHttp().getRequest();
        const { method, url, body, headers, params, status } = request;
        request.id = (Math.random() + 1).toString(36).substring(2);
        this.logger.log(`REQ:[${request.id}] [${method} ${url}]:-> ${JSON.stringify(maskHelper(body, ['password']))}`);
        return next.handle().pipe(
            map((data) => {
                const res = {
                    meta: {
                        headers: headers,
                        params: params,
                        status: status,
                        timestamp: new Date(),
                        requestId: request.id
                    },
                    result: data
                };
                this.logger.log(
                    `RES:[${request.id}] [${method} ${url}] :-> ${JSON.stringify(maskHelper(res, ['password']))}`
                );
                return res;
            })
        );
    }
}

import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { GeneralServerException } from '@app/exceptions/exceptions/general-server.exception';
import { throwError } from 'rxjs';

@Catch()
export class RpcExceptionFilter extends BaseRpcExceptionFilter {
    private logger = new Logger(RpcExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const requestContext = host.switchToRpc().getContext();
        if (!exception.isCustomError) {
            this.logger.error(
                `RES:[${requestContext.id}]:[UNHANDLED ERROR]: [${exception?.message}] :-> `,
                JSON.stringify(exception)
            );
            exception = new GeneralServerException();
        } else {
            this.logger.error(
                `RES:[${requestContext.id}]:[ERROR:${exception.errorCode}] ${exception.message.toUpperCase()}`
            );
        }
        return throwError(() => exception);
    }
}

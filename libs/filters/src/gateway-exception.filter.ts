import { ExceptionFilter, ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { GeneralServerException } from '@app/exceptions/exceptions/general-server.exception';

@Catch()
export class GatewayExceptionFilter implements ExceptionFilter {
    private logger = new Logger(GatewayExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        if (!exception.isCustomError) {
            this.logger.error(`[UNHANDLED ERROR]: [${exception?.message}] :-> `, JSON.stringify(exception));
            exception = new GeneralServerException();
        } else {
            this.logger.error(`[ERROR:${exception.errorCode}] ${exception.message.toUpperCase()}`);
        }
        response.status(500).json({
            meta: {
                headers: request.headers,
                params: request.params,
                status: request.status,
                errorCode: exception.errorCode,
                errorMessage: exception.message,
                timestamp: new Date(),
            },
            result: exception,
        });
    }
}

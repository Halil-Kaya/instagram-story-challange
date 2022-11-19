import {BaseRpcExceptionFilter} from "@nestjs/microservices";
import {ArgumentsHost, Catch, Logger} from "@nestjs/common";
import {GeneralServerException} from "@app/exceptions/exceptions/general-server.exception";
import {throwError} from "rxjs";

@Catch()
export class RpcExceptionFilter extends BaseRpcExceptionFilter {
    private logger = new Logger(RpcExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        if (!exception.isCustomError) {
            exception = new GeneralServerException();
        }
        this.logger.error(
            `[ERROR:${exception.errorCode}] ${exception.message.toUpperCase()}`,
        );
        return throwError(() => exception);
    }
}
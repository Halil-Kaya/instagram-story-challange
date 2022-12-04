import { CustomException } from '@app/exceptions/exceptions/custom.exception';
import { ErrorCodes } from '@app/exceptions/error-codes';

export class GeneralServerException extends CustomException {
    constructor() {
        super('General Server Exception', 500, ErrorCodes.GENERAL_SERVER_ERROR);
    }
}

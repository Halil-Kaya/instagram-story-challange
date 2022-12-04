import { CustomException } from '@app/exceptions/exceptions/custom.exception';
import { ErrorCodes } from '@app/exceptions/error-codes';

export class InvalidCredentialsException extends CustomException {
    constructor() {
        super('Invalid Credentials', 500, ErrorCodes.INVALID_CREDENTIALS);
    }
}

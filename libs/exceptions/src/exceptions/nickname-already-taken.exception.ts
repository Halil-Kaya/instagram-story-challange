import {CustomException} from "@app/exceptions/exceptions/custom.exception";
import {ErrorCodes} from "@app/exceptions/error-codes";

export class NicknameAlreadyTakenException extends CustomException {
    constructor() {
        super('Nickname is already taken', 500, ErrorCodes.NICKNAME_ALREADY_TAKEN);
    }
}
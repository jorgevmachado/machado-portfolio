export enum ERROR_STATUS_CODE {
    BAD_REQUEST_EXCEPTION = 400,
    UNAUTHORIZED_EXCEPTION = 401,
    FORBIDDEN_EXCEPTION = 403,
    NOT_FOUND_EXCEPTION = 404,
    REQUEST_TIMEOUT_EXCEPTION = 408,
    CONFLICT_EXCEPTION = 409,
    GONE_EXCEPTION = 410,
    UNPROCESSABLE_ENTITY_EXCEPTION = 422,
    INTERNAL_SERVER_ERROR_EXCEPTION = 500,
    NOT_IMPLEMENTED_EXCEPTION = 501,
    GATEWAY_TIMEOUT_EXCEPTION = 504,
}

export enum ERROR_TYPE {
    BAD_REQUEST_EXCEPTION = 'Bad Request',
    UNAUTHORIZED_EXCEPTION = 'Unauthorized',
    FORBIDDEN_EXCEPTION = 'Forbidden',
    NOT_FOUND_EXCEPTION = 'Not Found',
    REQUEST_TIMEOUT_EXCEPTION = 'Request Timeout',
    CONFLICT_EXCEPTION = 'Conflict',
    GONE_EXCEPTION = 'Gone',
    UNPROCESSABLE_ENTITY_EXCEPTION = 'Unprocessable Entity',
    INTERNAL_SERVER_ERROR_EXCEPTION = 'Internal Server Error',
    NOT_IMPLEMENTED_EXCEPTION = 'Not Implemented',
    GATEWAY_TIMEOUT_EXCEPTION = 'Gateway Timeout',
}

interface ErrorParams {
    message?: string;
    statusCode?: ERROR_STATUS_CODE;
}

export class Error {
    error: string;
    message: string;
    statusCode: ERROR_STATUS_CODE;

    constructor(params?: ErrorParams) {
        const { statusCode, message } = params ?? {};
        this.statusCode = statusCode ?? ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR_EXCEPTION;
        this.processError(this.statusCode);
        this.message = message ?? this.message;
    }

    private processError(statusCode: ERROR_STATUS_CODE) {
        switch (statusCode) {
            case ERROR_STATUS_CODE.BAD_REQUEST_EXCEPTION:
                this.error = ERROR_TYPE.BAD_REQUEST_EXCEPTION;
                this.message = ERROR_TYPE.BAD_REQUEST_EXCEPTION;
                break;
            case ERROR_STATUS_CODE.UNAUTHORIZED_EXCEPTION:
                this.error = ERROR_TYPE.UNAUTHORIZED_EXCEPTION;
                this.message = ERROR_TYPE.UNAUTHORIZED_EXCEPTION;
                break;
            case ERROR_STATUS_CODE.FORBIDDEN_EXCEPTION:
                this.error = ERROR_TYPE.FORBIDDEN_EXCEPTION;
                this.message = ERROR_TYPE.FORBIDDEN_EXCEPTION;
                break;
            case ERROR_STATUS_CODE.NOT_FOUND_EXCEPTION:
                this.error = ERROR_TYPE.NOT_FOUND_EXCEPTION;
                this.message = ERROR_TYPE.NOT_FOUND_EXCEPTION;
                break;
            case ERROR_STATUS_CODE.REQUEST_TIMEOUT_EXCEPTION:
                this.error = ERROR_TYPE.REQUEST_TIMEOUT_EXCEPTION;
                this.message = ERROR_TYPE.REQUEST_TIMEOUT_EXCEPTION;
                break;
            case ERROR_STATUS_CODE.CONFLICT_EXCEPTION:
                this.error = ERROR_TYPE.CONFLICT_EXCEPTION;
                this.message = ERROR_TYPE.CONFLICT_EXCEPTION;
                break;
            case ERROR_STATUS_CODE.GONE_EXCEPTION:
                this.error = ERROR_TYPE.GONE_EXCEPTION;
                this.message = ERROR_TYPE.GONE_EXCEPTION;
                break;
            case ERROR_STATUS_CODE.UNPROCESSABLE_ENTITY_EXCEPTION:
                this.error = ERROR_TYPE.UNPROCESSABLE_ENTITY_EXCEPTION;
                this.message = ERROR_TYPE.UNPROCESSABLE_ENTITY_EXCEPTION;
                break;
            case ERROR_STATUS_CODE.NOT_IMPLEMENTED_EXCEPTION:
                this.error = ERROR_TYPE.NOT_IMPLEMENTED_EXCEPTION;
                this.message = ERROR_TYPE.NOT_IMPLEMENTED_EXCEPTION;
                break;
            case ERROR_STATUS_CODE.GATEWAY_TIMEOUT_EXCEPTION:
                this.error = ERROR_TYPE.GATEWAY_TIMEOUT_EXCEPTION;
                this.message = ERROR_TYPE.GATEWAY_TIMEOUT_EXCEPTION;
                break;
            case ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR_EXCEPTION:
            default:
                this.error = ERROR_TYPE.INTERNAL_SERVER_ERROR_EXCEPTION;
                this.message = ERROR_TYPE.INTERNAL_SERVER_ERROR_EXCEPTION;
                break;
        }
    }
}
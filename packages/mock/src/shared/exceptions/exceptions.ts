import type { ResultResponse } from '../interface';

export function conflictException(message: string): ResultResponse {
  const responseError = {
    message,
    error: 'Conflict',
    statusCode: 409,
  };
  return {
    responseError,
    statusCode: responseError.statusCode,
  };
}
export function notFoundException(message: string): ResultResponse {
  const responseError = {
    message,
    error: 'Not Found',
    statusCode: 404,
  };
  return {
    responseError,
    statusCode: responseError.statusCode,
  };
}

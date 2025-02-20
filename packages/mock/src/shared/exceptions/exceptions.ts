import type { ResultResponse } from '../interface';

export function conflictException(message: string): ResultResponse {
  return createException(message, 409, 'Conflict');
}
export function notFoundException(message: string): ResultResponse {
  return createException(message, 404, 'Not Found');
}

export function badRequestException(message: string): ResultResponse {
  return createException(message, 400, 'Bad Request');
}

function createException(
  message: string,
  statusCode: number,
  error: string,
): ResultResponse {
  const responseError = { message, error, statusCode };
  return { responseError, statusCode };
}
import { Response } from 'express';
import { ResultResponse } from '../interface';

export function buildResponse(res: Response, result: ResultResponse) {
  const { statusCode, response, responseError } = result;
  const content = statusCode === 200 ? response : responseError;
  return res.status(statusCode).json(content);
}
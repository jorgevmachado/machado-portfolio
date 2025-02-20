import { Request, Response } from 'express';

import { isUUID } from '@repo/services/string/string';

import { notFoundException } from './exceptions';
import { paginate } from './paginate';
import { ResultResponse } from './interface';

export function findAll(req: Request, res: Response, list: Array<unknown>) {
  const { page, limit } = req.query;
  if (!page || !limit) {
    return res.json(list);
  }
  const result = paginate(Number(page), Number(limit), list);
  return buildResponse(res, result);
}

export function findOne(
  req: Request,
  res: Response,
  list: Array<unknown>,
  alias: string,
) {
  const { param } = req.params;
  const filterKey = isUUID(param) ? 'id' : 'name';
  const result = list.find((result) => result[filterKey] === param);
  if (!result) {
    return buildResponse(res, notFoundException(`${alias} not found`));
  }
  return res.json(result);
}

export function buildResponse(res: Response, result: ResultResponse) {
  const { statusCode, response, responseError } = result;
  const content = statusCode === 200 ? response : responseError;
  return res.status(statusCode).json(content);
}
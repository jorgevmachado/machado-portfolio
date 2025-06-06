import { Request, Response } from 'express';

import { notFoundException } from './exceptions';
import { paginate } from './paginate';
import { MockEntity } from './interface';
import { findOneEntity } from './entities';
import { buildResponse } from './response';

export function findAll<T = unknown>(
  req: Request,
  res: Response,
  mockEntity: MockEntity<T>,
) {
  const { page, limit } = req.query;
  if (!page || !limit) {
    return res.status(200).json(mockEntity.list);
  }
  const result = paginate(Number(page), Number(limit), mockEntity.list);
  return buildResponse(res, result);
}

export function findOne<T = unknown>(
  req: Request,
  res: Response,
  mockEntity: MockEntity<T>,
) {
  const { param } = req.params;
  if (!param) {
    return buildResponse(res, notFoundException('Param is required.'));
  }
  const result = findOneEntity(
    param,
    mockEntity.list as Array<Record<string, unknown>>,
  );
  if (!result) {
    return buildResponse(
      res,
      notFoundException(`${mockEntity.alias} not found`),
    );
  }
  return res.status(200).json(result);
}
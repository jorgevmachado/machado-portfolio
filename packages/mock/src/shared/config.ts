import { Request, Response } from 'express';

import { notFoundException } from './exceptions';
import { paginate } from './paginate';
import { MockEntity } from './interface';
import { findOneEntity } from './entities';
import { buildResponse } from './response';

export function findAll(req: Request, res: Response, mockEntity: MockEntity) {
  const { page, limit } = req.query;
  if (!page || !limit) {
    return res.json(mockEntity.list);
  }
  const result = paginate(Number(page), Number(limit), mockEntity.list);
  return buildResponse(res, result);
}

export function findOne(req: Request, res: Response, mockEntity: MockEntity) {
  const { param } = req.params;
  const result = findOneEntity(param, mockEntity.list);
  if (!result) {
    return buildResponse(
      res,
      notFoundException(`${mockEntity.alias} not found`),
    );
  }
  return res.json(result);
}

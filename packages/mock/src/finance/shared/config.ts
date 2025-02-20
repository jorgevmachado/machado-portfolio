import { Request, Response } from 'express';

import { buildResponse } from '../../shared';

import type { FinanceEntity } from '../interface';

import { createEntity } from './entities';
import { createEntityResponse } from './response';

export function create(
  req: Request,
  res: Response,
  financeEntity: FinanceEntity,
) {
  const { name, type } = req.body;

  const entity = createEntity({
    name,
    type,
    entity: financeEntity,
  });
  const entityResultResponse = createEntityResponse({
    name,
    type,
    entity,
    financeEntity,
  });
  return buildResponse(res, entityResultResponse);
}
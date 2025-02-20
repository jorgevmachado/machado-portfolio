import { Request, Response } from 'express';

import { buildResponse } from '../../shared';

import type { FinanceEntity } from '../interface';

import { createEntity, updateEntity } from './entities';
import { createEntityResponse, updateEntityResponse } from './response';

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

export function update(
  req: Request,
  res: Response,
  financeEntity: FinanceEntity,
) {
  const { param } = req.params;
  const { name, type } = req.body;

  const newEntity = updateEntity({ param, name, type, entity: financeEntity });
  const newEntityResultResponse = updateEntityResponse({
    type,
    entity: newEntity,
    financeEntity,
  });

  return buildResponse(res, newEntityResultResponse);
}

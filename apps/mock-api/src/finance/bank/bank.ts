import { Router } from 'express';

import { BANK_LIST_FIXTURE } from '@repo/business/finance/bank/fixtures/bank';

import { findAll, findOne } from '../../shared';

import { create, remove, update } from '../shared';

import type { FinanceEntity } from '../interface';

export const BANK_FINANCE_ENTITY: FinanceEntity = {
  id: 'BANK',
  list: BANK_LIST_FIXTURE,
  label: 'Bank',
  alias: 'banks',
};

const bankRouter = Router();

bankRouter.get('/', (req, res) => findAll(req, res, BANK_FINANCE_ENTITY));

bankRouter.get('/:param', (req, res) => findOne(req, res, BANK_FINANCE_ENTITY));

bankRouter.post('/', (req, res) => create(req, res, BANK_FINANCE_ENTITY));

bankRouter.put('/:param', (req, res) => update(req, res, BANK_FINANCE_ENTITY));

bankRouter.delete('/:param', (req, res) =>
  remove(req, res, BANK_FINANCE_ENTITY),
);

export default bankRouter;
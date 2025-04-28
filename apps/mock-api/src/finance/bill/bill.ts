import { Router } from 'express';

import { BILL_LIST_FIXTURE } from '@repo/business/finance/bill/fixtures/bill';

import { findAll } from '../../shared';

import type { FinanceEntity } from '../interface';

import billCategoryRouter, { BILL_CATEGORY_FINANCE_ENTITY } from '../bill-category';

export const BILL_FINANCE_ENTITY: FinanceEntity = {
  id: 'BILL',
  label: 'Bill',
  alias: 'bills',
  list: BILL_LIST_FIXTURE,
  category: BILL_CATEGORY_FINANCE_ENTITY,
};

const billRouter = Router();

billRouter.use('/', billCategoryRouter);

billRouter.get('/', (req, res) => findAll(req, res, BILL_FINANCE_ENTITY));

export default billRouter;
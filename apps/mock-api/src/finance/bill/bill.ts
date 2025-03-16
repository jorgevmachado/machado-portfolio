import { Router } from 'express';

import { findAll } from '../../shared';

import { BILL_LIST_FIXTURE } from '@repo/business/finance/bill/fixtures/bill';

import type { FinanceEntity } from '../interface';

export const BILL_FINANCE_ENTITY: FinanceEntity = {
  id: 'BILL',
  label: 'Bill',
  alias: 'bills',
  list: BILL_LIST_FIXTURE,
};

const billRouter = Router();

billRouter.get('/', (req, res) => findAll(req, res, BILL_FINANCE_ENTITY));

export default billRouter;
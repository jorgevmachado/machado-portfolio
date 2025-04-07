import { Router } from 'express';

import { FINANCE_FIXTURE } from '@repo/business/finance/fixtures/finance';

import { findAll, findOne } from '../shared';

import supplierRouter from './supplier';
import bankRouter from './bank';
import expenseRouter from './expense';
import billRouter from './bill';

import type { FinanceEntity } from './interface';

const financeRouter = Router();

export const currentPath = '/finance';

export const FINANCE_ENTITY: FinanceEntity = {
  id: 'FINANCE',
  label: 'Finance',
  alias: 'finances',
  list: [FINANCE_FIXTURE],
};

financeRouter.use(`${currentPath}/supplier`, supplierRouter);
financeRouter.use(`${currentPath}/bank`, bankRouter);
financeRouter.use(`${currentPath}/bill`, billRouter);
financeRouter.use(`${currentPath}/expense`, expenseRouter);

financeRouter.get(`${currentPath}/`, (req, res) => findAll(req, res, FINANCE_ENTITY));

financeRouter.post(`${currentPath}/initialize`, (req, res) => findAll(req, res, FINANCE_ENTITY));

financeRouter.get(`${currentPath}/:param`, (req, res) => findOne(req, res, FINANCE_ENTITY));

financeRouter.post(`${currentPath}/seeds`, (req, res) => {
  res.jsonp({
    message: 'Seeds executed successfully',
  });
});

export default financeRouter;
import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { expensePath } from '../finance';

import { EXPENSE_FINANCE_ENTITY } from './fixtures';
import { create, update } from './config';

const expenseRouter = Router();

const path = expensePath;

expenseRouter.get(path, (req, res) =>
  findAll(req, res, EXPENSE_FINANCE_ENTITY),
);

expenseRouter.get(`${path}/:param`, (req, res) =>
  findOne(req, res, EXPENSE_FINANCE_ENTITY),
);

expenseRouter.post(`${path}`, (req, res) => create(req, res));

expenseRouter.put(`${path}/:id`, (req, res) => update(req, res));

export default expenseRouter;
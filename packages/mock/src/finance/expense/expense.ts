import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { LIST_MONTE_CARLO_EXPENSE_FIXTURE } from './fixtures';
import { create } from './config';

const expenseRouter = Router();

expenseRouter.get('/finance/expense', (req, res) =>
  findAll(req, res, LIST_MONTE_CARLO_EXPENSE_FIXTURE),
);

expenseRouter.get('/finance/expense/:param', (req, res) =>
  findOne(req, res, LIST_MONTE_CARLO_EXPENSE_FIXTURE, 'expenses'),
);

expenseRouter.post('/finance/expense', (req, res) => create(req, res));

export default expenseRouter;
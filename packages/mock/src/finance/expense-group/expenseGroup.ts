import { Router } from 'express';

import { createByName, findAll, findOne } from '../../shared';

import { LIST_EXPENSE_GROUP_FIXTURE } from './fixtures';

const expenseGroupRouter = Router();

expenseGroupRouter.get('/finance/expense/list/group', (req, res) =>
  findAll(req, res, LIST_EXPENSE_GROUP_FIXTURE),
);

expenseGroupRouter.get('/finance/expense/:param/group', (req, res) =>
  findOne(req, res, LIST_EXPENSE_GROUP_FIXTURE, 'expense_groups'),
);

expenseGroupRouter.post('/finance/expense/group', (req, res) =>
  createByName(req, res, LIST_EXPENSE_GROUP_FIXTURE),
);

export default expenseGroupRouter;
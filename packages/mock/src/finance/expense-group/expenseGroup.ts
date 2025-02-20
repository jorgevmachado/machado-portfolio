import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { create } from '../shared';

import {
  EXPENSE_GROUP_FINANCE_ENTITY,
  LIST_EXPENSE_GROUP_FIXTURE,
} from './fixtures';

const expenseGroupRouter = Router();

expenseGroupRouter.get('/finance/expense/list/group', (req, res) =>
  findAll(req, res, LIST_EXPENSE_GROUP_FIXTURE),
);

expenseGroupRouter.get('/finance/expense/:param/group', (req, res) =>
  findOne(req, res, LIST_EXPENSE_GROUP_FIXTURE, 'expense_groups'),
);

expenseGroupRouter.post('/finance/expense/group', (req, res) =>
  create(req, res, EXPENSE_GROUP_FINANCE_ENTITY),
);

export default expenseGroupRouter;
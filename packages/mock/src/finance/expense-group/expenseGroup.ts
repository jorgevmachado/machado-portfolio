import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { create, remove, update } from '../shared';
import { expensePath } from '../finance';

import { EXPENSE_GROUP_FINANCE_ENTITY } from './fixtures';

const expenseGroupRouter = Router();

const path = expensePath;

expenseGroupRouter.get(`${path}/list/group`, (req, res) =>
  findAll(req, res, EXPENSE_GROUP_FINANCE_ENTITY),
);

expenseGroupRouter.get(`${path}/:param/group`, (req, res) =>
  findOne(req, res, EXPENSE_GROUP_FINANCE_ENTITY),
);

expenseGroupRouter.post(`${path}/group`, (req, res) =>
  create(req, res, EXPENSE_GROUP_FINANCE_ENTITY),
);

expenseGroupRouter.put(`${path}/:param/group`, (req, res) =>
  update(req, res, EXPENSE_GROUP_FINANCE_ENTITY),
);

expenseGroupRouter.delete(`${path}/:param/group`, (req, res) =>
  remove(req, res, EXPENSE_GROUP_FINANCE_ENTITY),
);

export default expenseGroupRouter;
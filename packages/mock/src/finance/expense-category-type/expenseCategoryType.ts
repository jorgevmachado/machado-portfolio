import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { create } from '../shared';

import {
  EXPENSE_CATEGORY_TYPE_FINANCE_ENTITY,
  LIST_EXPENSE_CATEGORY_TYPE_FIXTURE,
} from './fixtures';

const expenseCategoryTypeRouter = Router();

expenseCategoryTypeRouter.get(
  '/finance/expense/category/list/type',
  (req, res) => findAll(req, res, LIST_EXPENSE_CATEGORY_TYPE_FIXTURE),
);

expenseCategoryTypeRouter.get(
  '/finance/expense/category/:param/type',
  (req, res) =>
    findOne(
      req,
      res,
      LIST_EXPENSE_CATEGORY_TYPE_FIXTURE,
      'expense_category_types',
    ),
);

expenseCategoryTypeRouter.post('/finance/expense/category/type', (req, res) =>
  create(req, res, EXPENSE_CATEGORY_TYPE_FINANCE_ENTITY),
);

export default expenseCategoryTypeRouter;
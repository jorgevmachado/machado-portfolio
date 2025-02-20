import { Router } from 'express';
import { findAll, findOne } from '../../shared';
import {
  EXPENSE_CATEGORY_FINANCE_ENTITY,
  LIST_EXPENSE_CATEGORY_FIXTURE,
} from './fixtures';
import { create } from '../shared';

const expenseCategoryRouter = Router();

expenseCategoryRouter.get('/finance/expense/list/category', (req, res) =>
  findAll(req, res, LIST_EXPENSE_CATEGORY_FIXTURE),
);

expenseCategoryRouter.get('/finance/expense/:param/category', (req, res) =>
  findOne(req, res, LIST_EXPENSE_CATEGORY_FIXTURE, 'expense_categories'),
);

expenseCategoryRouter.post('/finance/expense/category', (req, res) =>
  create(req, res, EXPENSE_CATEGORY_FINANCE_ENTITY),
);

export default expenseCategoryRouter;
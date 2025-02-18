import { Router } from 'express';
import { createByName, findAll, findOne } from '../../shared';
import { LIST_EXPENSE_CATEGORY_FIXTURE } from './fixtures';

const expenseCategoryRouter = Router();

expenseCategoryRouter.get('/finance/expense/list/category', (req, res) =>
  findAll(req, res, LIST_EXPENSE_CATEGORY_FIXTURE),
);

expenseCategoryRouter.get('/finance/expense/:param/category', (req, res) =>
  findOne(req, res, LIST_EXPENSE_CATEGORY_FIXTURE, 'expense_categories'),
);

expenseCategoryRouter.post('/finance/expense/category', (req, res) =>
  createByName(req, res, LIST_EXPENSE_CATEGORY_FIXTURE),
);

export default expenseCategoryRouter;
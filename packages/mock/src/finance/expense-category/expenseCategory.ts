import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { create, update } from '../shared';
import { expensePath } from '../finance';

import { EXPENSE_CATEGORY_FINANCE_ENTITY } from './fixtures';

const path = expensePath;

const expenseCategoryRouter = Router();

expenseCategoryRouter.get(`${path}/list/category`, (req, res) =>
  findAll(req, res, EXPENSE_CATEGORY_FINANCE_ENTITY),
);

expenseCategoryRouter.get(`${path}/:param/category`, (req, res) =>
  findOne(req, res, EXPENSE_CATEGORY_FINANCE_ENTITY),
);

expenseCategoryRouter.post(`${path}/category`, (req, res) =>
  create(req, res, EXPENSE_CATEGORY_FINANCE_ENTITY),
);

expenseCategoryRouter.put(`${path}/:param/category`, (req, res) =>
  update(req, res, EXPENSE_CATEGORY_FINANCE_ENTITY),
);

export default expenseCategoryRouter;
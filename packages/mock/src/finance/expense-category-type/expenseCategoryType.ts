import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { create, remove, update } from '../shared';
import { expensePath } from '../finance';

import { EXPENSE_CATEGORY_TYPE_FINANCE_ENTITY } from './fixtures';

const expenseCategoryTypeRouter = Router();

const path = `${expensePath}/category`;

expenseCategoryTypeRouter.get(`${path}/list/type`, (req, res) =>
  findAll(req, res, EXPENSE_CATEGORY_TYPE_FINANCE_ENTITY),
);

expenseCategoryTypeRouter.get(`${path}/:param/type`, (req, res) =>
  findOne(req, res, EXPENSE_CATEGORY_TYPE_FINANCE_ENTITY),
);

expenseCategoryTypeRouter.post(`${path}/type`, (req, res) =>
  create(req, res, EXPENSE_CATEGORY_TYPE_FINANCE_ENTITY),
);

expenseCategoryTypeRouter.put(`${path}/:param/type`, (req, res) =>
  update(req, res, EXPENSE_CATEGORY_TYPE_FINANCE_ENTITY),
);

expenseCategoryTypeRouter.delete(`${path}/:param/type`, (req, res) =>
  remove(req, res, EXPENSE_CATEGORY_TYPE_FINANCE_ENTITY),
);

export default expenseCategoryTypeRouter;
import { Router } from 'express';

import { BILL_CATEGORY_LIST_FIXTURE } from '@repo/business/finance/bill-category/fixtures/billCategory';

import { findAll, findOne } from '../../shared';

import { create, remove, update } from '../shared';
import type { FinanceEntity } from '../interface';

export const BILL_CATEGORY_FINANCE_ENTITY: FinanceEntity = {
  id: 'BILL_CATEGORY',
  label: 'Bill Category',
  alias: 'bill_categories',
  list: BILL_CATEGORY_LIST_FIXTURE,
};

const supplierTypeRouter = Router();

supplierTypeRouter.get(`/list/category`, (req, res) =>
  findAll(req, res, BILL_CATEGORY_FINANCE_ENTITY),
);

supplierTypeRouter.get(`/:param/category`, (req, res) =>
  findOne(req, res, BILL_CATEGORY_FINANCE_ENTITY),
);

supplierTypeRouter.post(`/category`, (req, res) =>
  create(req, res, BILL_CATEGORY_FINANCE_ENTITY),
);

supplierTypeRouter.put(`/:param/category`, (req, res) =>
  update(req, res, BILL_CATEGORY_FINANCE_ENTITY),
);

supplierTypeRouter.delete(`/:param/category`, (req, res) =>
  remove(req, res, BILL_CATEGORY_FINANCE_ENTITY),
);

export default supplierTypeRouter;
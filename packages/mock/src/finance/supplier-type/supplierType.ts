import { Router } from 'express';

import { SUPPLIER_LIST_TYPE_FIXTURE } from '@repo/business/finance/supplier-type/fixtures/supplierType';

import { findAll, findOne } from '../../shared';

import { create, remove, update } from '../shared';
import type { FinanceEntity } from '../interface';

export const SUPPLIER_TYPE_FINANCE_ENTITY: FinanceEntity = {
  id: 'SUPPLIER_TYPE',
  label: 'Supplier Type',
  alias: 'supplier_types',
  list: SUPPLIER_LIST_TYPE_FIXTURE,
};

const supplierTypeRouter = Router();

supplierTypeRouter.get(`/list/type`, (req, res) =>
  findAll(req, res, SUPPLIER_TYPE_FINANCE_ENTITY),
);

supplierTypeRouter.get(`/:param/type`, (req, res) =>
  findOne(req, res, SUPPLIER_TYPE_FINANCE_ENTITY),
);

supplierTypeRouter.post(`/type`, (req, res) =>
  create(req, res, SUPPLIER_TYPE_FINANCE_ENTITY),
);

supplierTypeRouter.put(`/:param/type`, (req, res) =>
  update(req, res, SUPPLIER_TYPE_FINANCE_ENTITY),
);

supplierTypeRouter.delete(`/:param/type`, (req, res) =>
  remove(req, res, SUPPLIER_TYPE_FINANCE_ENTITY),
);

export default supplierTypeRouter;
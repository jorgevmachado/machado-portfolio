import { Router } from 'express';

import { SUPPLIER_LIST_FIXTURE } from '@repo/business/finance/supplier/fixtures/supplier';

import { findAll, findOne } from '../../shared';

import { create, remove, update } from '../shared';

import supplierTypeRouter, { SUPPLIER_TYPE_FINANCE_ENTITY } from '../supplier-type';

import type { FinanceEntity } from '../interface';

export const SUPPLIER_FINANCE_ENTITY: FinanceEntity = {
  id: 'SUPPLIER',
  label: 'Supplier',
  alias: 'suppliers',
  list: SUPPLIER_LIST_FIXTURE,
  type: SUPPLIER_TYPE_FINANCE_ENTITY,
};

const supplierRouter = Router();

supplierRouter.use('/', supplierTypeRouter);

supplierRouter.get('/', (req, res) =>
  findAll(req, res, SUPPLIER_FINANCE_ENTITY),
);

supplierRouter.get('/:param', (req, res) =>
  findOne(req, res, SUPPLIER_FINANCE_ENTITY),
);

supplierRouter.post('/', (req, res) =>
  create(req, res, SUPPLIER_FINANCE_ENTITY),
);

supplierRouter.put('/:param', (req, res) =>
  update(req, res, SUPPLIER_FINANCE_ENTITY),
);

supplierRouter.delete('/:param', (req, res) =>
  remove(req, res, SUPPLIER_FINANCE_ENTITY),
);

export default supplierRouter;
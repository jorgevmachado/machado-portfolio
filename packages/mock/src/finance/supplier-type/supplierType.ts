import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { create } from '../shared';

import {
  LIST_SUPPLIER_TYPE_FIXTURE,
  SUPPLIER_TYPE_FINANCE_ENTITY,
} from './fixtures';

const supplierTypeRouter = Router();

supplierTypeRouter.get('/finance/supplier/list/type', (req, res) =>
  findAll(req, res, LIST_SUPPLIER_TYPE_FIXTURE),
);

supplierTypeRouter.get('/finance/supplier/:param/type', (req, res) =>
  findOne(req, res, LIST_SUPPLIER_TYPE_FIXTURE, 'supplier_types'),
);

supplierTypeRouter.post('/finance/supplier/type', (req, res) =>
  create(req, res, SUPPLIER_TYPE_FINANCE_ENTITY),
);

export default supplierTypeRouter;
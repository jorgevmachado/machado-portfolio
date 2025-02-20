import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { create } from '../shared';

import { LIST_SUPPLIER_FIXTURE, SUPPLIER_FINANCE_ENTITY } from './fixtures';

const supplierRouter = Router();

supplierRouter.get('/finance/supplier', (req, res) =>
  findAll(req, res, LIST_SUPPLIER_FIXTURE),
);

supplierRouter.get('/finance/supplier/:param', (req, res) =>
  findOne(req, res, LIST_SUPPLIER_FIXTURE, 'suppliers'),
);

supplierRouter.post('/finance/supplier', (req, res) =>
  create(req, res, SUPPLIER_FINANCE_ENTITY),
);

export default supplierRouter;
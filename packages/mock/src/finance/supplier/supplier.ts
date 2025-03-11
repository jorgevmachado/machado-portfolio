import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { create, remove, update } from '../shared';

import { SUPPLIER_FINANCE_ENTITY } from './fixtures';

import supplierTypeRouter from '../supplier-type'

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
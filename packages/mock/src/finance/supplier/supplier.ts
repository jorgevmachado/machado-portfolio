import { Router } from 'express';

import { createByName, findAll, findOne } from '../../shared';

import { LIST_SUPPLIER_FIXTURE } from './fixtures';

const supplierRouter = Router();

supplierRouter.get('/finance/supplier', (req, res) =>
  findAll(req, res, LIST_SUPPLIER_FIXTURE),
);

supplierRouter.get('/finance/supplier/:param', (req, res) =>
  findOne(req, res, LIST_SUPPLIER_FIXTURE, 'suppliers'),
);

supplierRouter.post('/finance/supplier', (req, res) =>
  createByName(req, res, LIST_SUPPLIER_FIXTURE),
);

export default supplierRouter;
import { Router } from 'express';

import { createByName, findAll, findOne } from '../../shared';

import { LIST_SUPPLIER_TYPE_FIXTURE } from './fixtures';

const supplierTypeRouter = Router();

supplierTypeRouter.get('/finance/supplier/list/type', (req, res) =>
  findAll(req, res, LIST_SUPPLIER_TYPE_FIXTURE),
);

supplierTypeRouter.get('/finance/supplier/:param/type', (req, res) =>
  findOne(req, res, LIST_SUPPLIER_TYPE_FIXTURE, 'supplier_types'),
);

supplierTypeRouter.post('/finance/supplier/type', (req, res) =>
  createByName(req, res, LIST_SUPPLIER_TYPE_FIXTURE),
);

export default supplierTypeRouter;
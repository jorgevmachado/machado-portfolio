import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { create, remove, update } from '../shared';

import { SUPPLIER_TYPE_FINANCE_ENTITY } from './fixtures';

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
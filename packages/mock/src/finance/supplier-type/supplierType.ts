import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { create, update } from '../shared';
import { supplierPath } from '../finance';

import { SUPPLIER_TYPE_FINANCE_ENTITY } from './fixtures';

const path = supplierPath;

const supplierTypeRouter = Router();

supplierTypeRouter.get(`${path}/list/type`, (req, res) =>
  findAll(req, res, SUPPLIER_TYPE_FINANCE_ENTITY),
);

supplierTypeRouter.get(`${path}/:param/type`, (req, res) =>
  findOne(req, res, SUPPLIER_TYPE_FINANCE_ENTITY),
);

supplierTypeRouter.post(`${path}/type`, (req, res) =>
  create(req, res, SUPPLIER_TYPE_FINANCE_ENTITY),
);

supplierTypeRouter.put(`${path}/:param/type`, (req, res) =>
  update(req, res, SUPPLIER_TYPE_FINANCE_ENTITY),
);

export default supplierTypeRouter;
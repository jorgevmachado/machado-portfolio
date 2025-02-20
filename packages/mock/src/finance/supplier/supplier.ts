import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { create, update } from '../shared';
import { supplierPath } from '../finance';

import { SUPPLIER_FINANCE_ENTITY } from './fixtures';

const path = supplierPath;

const supplierRouter = Router();

supplierRouter.get(`${path}`, (req, res) =>
  findAll(req, res, SUPPLIER_FINANCE_ENTITY),
);

supplierRouter.get(`${path}/:param`, (req, res) =>
  findOne(req, res, SUPPLIER_FINANCE_ENTITY),
);

supplierRouter.post(`${path}`, (req, res) =>
  create(req, res, SUPPLIER_FINANCE_ENTITY),
);

supplierRouter.put(`${path}/:param`, (req, res) =>
  update(req, res, SUPPLIER_FINANCE_ENTITY),
);

export default supplierRouter;
import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { create, remove, update } from '../shared';
import { BANK_FINANCE_ENTITY } from './fixtures';

const bankRouter = Router();

bankRouter.get('/', (req, res) => findAll(req, res, BANK_FINANCE_ENTITY));

bankRouter.get('/:param', (req, res) => findOne(req, res, BANK_FINANCE_ENTITY));

bankRouter.post('/', (req, res) => create(req, res, BANK_FINANCE_ENTITY));

bankRouter.put('/:param', (req, res) => update(req, res, BANK_FINANCE_ENTITY));

bankRouter.delete('/:param', (req, res) =>
  remove(req, res, BANK_FINANCE_ENTITY),
);

export default bankRouter;
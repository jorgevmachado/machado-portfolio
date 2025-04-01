import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { create } from './service';

import { EXPENSE_FINANCE_ENTITY, update } from './config';

const expenseRouter = Router();

expenseRouter.get('/', (req, res) => findAll(req, res, EXPENSE_FINANCE_ENTITY));

expenseRouter.get('/:param', (req, res) =>
  findOne(req, res, EXPENSE_FINANCE_ENTITY),
);

expenseRouter.post('/', (req, res) => create(req, res));

expenseRouter.put('/:id', (req, res) => update(req, res));

export default expenseRouter;
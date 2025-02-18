import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { LIST_MONTE_CARLO_EXPENSE_FIXTURE } from './fixtures';

const expenseRouter = Router();

expenseRouter.get('/finance/expense', (req, res) =>
  findAll(req, res, LIST_MONTE_CARLO_EXPENSE_FIXTURE),
);

expenseRouter.get('/finance/expense/:param', (req, res) =>
  findOne(req, res, LIST_MONTE_CARLO_EXPENSE_FIXTURE, 'expenses', true),
);

expenseRouter.post('/finance/expense', (req, res) => {
    return res.json({ message: 'Registration Completed Successfully!'});
})

export default expenseRouter;
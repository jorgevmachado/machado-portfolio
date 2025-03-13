import { Router } from 'express';

import { findAll } from '../../shared';
import { BILL_FINANCE_ENTITY } from './fixtures';

const billRouter = Router();

billRouter.get('/', (req, res) => findAll(req, res, BILL_FINANCE_ENTITY));

export default billRouter;
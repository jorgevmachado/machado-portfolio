import { Router } from 'express';

import supplierRouter from './supplier';
import bankRouter from './bank';
import expenseRouter from './expense';
import billRouter from './bill';

const financeRouter = Router();

export const currentPath = '/finance';

financeRouter.use(`${currentPath}/supplier`, supplierRouter);
financeRouter.use(`${currentPath}/bank`, bankRouter);
financeRouter.use(`${currentPath}/bill`, billRouter);
financeRouter.use(`${currentPath}/expense`, expenseRouter);

financeRouter.post(`${currentPath}/seeds`, (req, res) => {
  res.jsonp({
    message: 'Seeds executed successfully',
  });
});

export default financeRouter;
import { Router } from 'express';

const financeRouter = Router();

export const currentPath = '/finance';
export const expensePath = `${currentPath}/expense`;
export const supplierPath = `${currentPath}/supplier`;

financeRouter.post(`${currentPath}/seeds`, (req, res) => {
  res.jsonp({
    message: 'Seeds executed successfully',
  });
});

export default financeRouter;
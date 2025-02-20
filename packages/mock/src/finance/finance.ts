import { Router } from 'express';

const financeRouter = Router();

export const currentPath = '/finance';
export const expensePath = `${currentPath}/expense`;
export const supplierPath = `${currentPath}/supplier`;

export default financeRouter;
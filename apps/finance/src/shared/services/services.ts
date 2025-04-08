import { Nest } from '@repo/business/api/nest/nest';
import { getAccessToken } from '../cookies';
import { AuthService } from '@repo/business/auth/service';
import { FinanceService } from '@repo/business/finance/service';
import { SupplierTypeService } from '@repo/business/finance/supplier-type/service';
import { SupplierService } from '@repo/business/finance/supplier/service';
import { BankService } from '@repo/business/finance/bank/service';
import { BillCategoryService } from '@repo/business/finance/bill-category/service';
import { BillService } from '@repo/business/finance/bill/service';
import { ExpenseService } from '@repo/business/finance/expense/service';

const baseUrl = process.env.NEXT_PUBLIC_API ?? 'http://localhost:3001';

const token = getAccessToken() || '';

const nest = new Nest({
  token,
  baseUrl,
});

export const authService = new AuthService(nest);

export const supplierService = new SupplierService(nest);

export const supplierTypeService = new SupplierTypeService(nest);

export const bankService = new BankService(nest);

export const billCategoryService = new BillCategoryService(nest);

export const billService = new BillService(nest);

export const expenseService = new ExpenseService(nest);

export const financeService = new FinanceService(nest);

import { Nest } from '@repo/business/api/nest/nest';
import { getAccessToken } from '../cookies';
import { AuthService } from '@repo/business/auth/authService';
import { FinanceService } from '@repo/business/finance/financeService';
import { SupplierTypeService } from '@repo/business/finance/supplier-type/supplierTypeService';
import { SupplierService } from '@repo/business/finance/supplier/supplierService';
import { BankService } from '@repo/business/finance/bank/bankService';

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

export const financeService = new FinanceService(nest);

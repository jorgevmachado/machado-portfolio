import type {
  IExpense,
  IPaymentMethod,
  ISupplier,
  ISupplierCategory,
  ISupplierType,
  ITypePaymentMethod,
} from '../api/nest/finance';

export type SupplierType = ISupplierType;

export type SupplierCategory = ISupplierCategory;

export type TypePaymentMethod = ITypePaymentMethod;

export type PaymentMethod = IPaymentMethod;

export type Supplier = ISupplier;

export type Expense = IExpense;

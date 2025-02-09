interface IFinanceBase {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

export type ISupplierType = IFinanceBase;

export interface ISupplierCategory extends IFinanceBase {
    type: ISupplierType;
}

export type ITypePaymentMethod = IFinanceBase;

export interface IPaymentMethod extends IFinanceBase {
    type: ITypePaymentMethod;
}

export interface ISupplier extends IFinanceBase {
    category: ISupplierCategory;
    description?: string;
}

export type TExpense = 'FIXED' | 'VARIABLE';
export type TStatusExpense = 'PENDING' | 'PAID' | 'CANCELLED' | 'EXPIRED' | 'NOT PAID';

export type TMonth = 'JANUARY'| 'FEBRUARY'| 'MARCH'| 'APRIL'| 'MAY'| 'JUNE'| 'JULY'| 'AUGUST'| 'SEPTEMBER'| 'OCTOBER'| 'NOVEMBER'| 'DECEMBER';

export type TFrequency = 'MONTHLY' | 'QUARTERLY' | 'SEMIANNUALLY' | 'ANNUALLY';
export interface IExpense extends IFinanceBase {
    type: TExpense;
    total: number;
    year: number;
    month: TMonth;
    active?: boolean;
    status: TStatusExpense;
    supplier: ISupplier;
    frequency?: TFrequency;
    description?: string;
    payment_method: IPaymentMethod;
}

export interface IInstallment extends IFinanceBase {
    value: number;
    expense:IExpense;
    installment_number: number;
    payment_status: 'PENDING' | 'PAID';
}
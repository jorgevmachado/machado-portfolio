import {EExpenseType, EMonth} from "./enum";

interface IFinanceBase {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

export type IExpenseGroup = IFinanceBase;

export type IExpenseCategoryType = IFinanceBase;

export interface IExpenseCategory extends IFinanceBase {
    type: IExpenseCategoryType;
}

export type ISupplierType = IFinanceBase;

export interface ISupplier extends IFinanceBase {
    type: ISupplierType;
    name: string;
    active?: boolean;
    description?: string;
}

export interface IExpense extends Omit<IFinanceBase, 'name'> {
    year?: number;
    type: EExpenseType;
    paid?: boolean;
    value: number;
    total?: number;
    month?: EMonth;
    group: IExpenseGroup;
    active?: boolean;
    supplier: ISupplier;
    category: IExpenseCategory;
    total_paid?: number;
    january?: number;
    january_paid?: boolean;
    february?: number;
    february_paid?: boolean;
    march?: number;
    march_paid?: boolean;
    april?: number;
    april_paid?: boolean;
    may?: number;
    may_paid?: boolean;
    june?: number;
    june_paid?: boolean;
    july?: number;
    july_paid?: boolean;
    august?: number;
    august_paid?: boolean;
    september?: number;
    september_paid?: boolean;
    october?: number;
    october_paid?: boolean;
    november?: number;
    november_paid?: boolean;
    december?: number;
    december_paid?: boolean;
    description?: string;
    instalment_number?: number;
}
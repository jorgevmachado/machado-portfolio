import type { IFinanceBase, IFinanceResponse } from '../interface';

export type IExpenseCategoryType = IFinanceBase;

export type IExpenseCategoryTypeResponse = IFinanceResponse;

export interface IExpenseCategoryTypeParams {
    name: string;
}
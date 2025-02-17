import type { IFinanceBase, IFinanceResponse } from '../interface';

export type IExpenseGroup = IFinanceBase;

export type IExpenseGroupResponse = IFinanceResponse;

export interface IExpenseGroupParams {
    name: string;
}
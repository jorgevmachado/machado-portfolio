import type { IFinance } from '../api/nest/finance';

export type FinanceEntity = IFinance;

export interface FinanceConstructorParams extends Omit<FinanceEntity, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> {
    id?: FinanceEntity['id'];
    created_at?: FinanceEntity['created_at'];
    updated_at?: FinanceEntity['updated_at'];
    deleted_at?: FinanceEntity['deleted_at'];
}
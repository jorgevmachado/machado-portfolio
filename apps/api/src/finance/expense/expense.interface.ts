import { ListParams } from '../../shared/interface';
import { QueryParameters } from '@repo/business/shared/interface';

export interface ExpenseQueryParameters extends QueryParameters {
    paid?: boolean;
    type?: string;
    active?: boolean;
    supplier?: string;
}

export interface ExpenseListParams extends Omit<ListParams, 'parameters'> {
    parameters?: ExpenseQueryParameters;
}
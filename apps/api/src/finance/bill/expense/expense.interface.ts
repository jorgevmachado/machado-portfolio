import type { QueryParameters } from '@repo/business/shared/interface';
import type { ListParams } from '../../../shared/queries';

export interface ExpenseQueryParameters extends QueryParameters {
  paid?: boolean;
  type?: string;
  active?: boolean;
  supplier?: string;
}

export interface ExpenseListParams extends Omit<ListParams, 'parameters'> {
  parameters?: ExpenseQueryParameters;
}
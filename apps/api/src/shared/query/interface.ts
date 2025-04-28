import type { TBy } from '../interface';

export type TQueryCondition =
    | '='
    | '>'
    | '<'
    | '>='
    | '<='
    | 'LIKE'
    | 'IN'
    | 'NOT IN'
    | 'IS NULL'
    | 'IS NOT NULL'
    | 'AND'
    | 'OR'
    | 'NOT';

export interface FilterParams {
  value: string | number;
  param: string;
  relation?: boolean;
  condition: TQueryCondition;
}

export interface SearchParams {
  by: TBy;
  value: string | number;
  condition?: TQueryCondition;
}

export interface WhereParams extends Omit<SearchParams, 'by'> {
  by: string;
  relation?: boolean;
}
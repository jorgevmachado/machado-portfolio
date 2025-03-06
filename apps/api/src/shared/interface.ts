import { QueryParameters } from '@repo/business/shared/interface';

export interface ListParams {
  filters?: Array<FilterParams>;
  defaultAsc?: string;
  parameters?: QueryParameters;
  withDeleted?: boolean;
  withRelations?: boolean;
}

export interface FilterParams {
  value: string;
  param: string;
  condition: TQueryCondition;
}

export interface FindByParams
  extends Pick<ListParams, 'filters' | 'withDeleted' | 'withRelations'> {
  withThrow?: boolean;
  relations?: Array<string>;
  searchParams: SearchParams;
}

export interface SearchParams {
  by: TBy;
  value: string | number;
  condition?: TQueryCondition;
}

export interface WhereParams extends Omit<SearchParams, 'by'> {
  by: string;
}

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

export type TBy =
  | 'id'
  | 'cpf'
  | 'order'
  | 'name'
  | 'email'
  | 'whatsapp'
  | 'accountId';

export interface FindOneByOrder<T, R> {
  order: number;
  response?: R;
  complete?: boolean;
  withThrow?: boolean;
  completingData?: (result: T, response: R | T) => Promise<T>;
}

export interface FindOneByParams extends Omit<FindByParams, 'searchParams'> {
  value: string;
}
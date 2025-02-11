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
  condition: string;
}

export interface FindByParams {
  withThrow?: boolean;
  relations?: Array<string>;
  searchParams: SearchParams;
  withDeleted?: boolean;
  withRelations?: boolean;
}

export interface SearchParams {
  by: TBy;
  value: string | number;
}

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
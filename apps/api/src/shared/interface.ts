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

export interface FindParams {
  withThrow?: boolean;
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

export interface FindOneParams<T, R> {
  order: number;
  response?: R;
  complete?: boolean;
  withThrow?: boolean;
  completingData?: (result: T, response: R | T) => Promise<T>;
}

import type { QueryParameters } from '@repo/business/shared/interface';

import type { FilterParams, SearchParams } from '../query';

export interface FindOneByParams extends Omit<FindByParams, 'searchParams'> {
  value: string;
}

export interface ListParams {
  filters?: Array<FilterParams>;
  defaultAsc?: string;
  parameters?: QueryParameters;
  withDeleted?: boolean;
  withRelations?: boolean;
}

export interface FindByParams
  extends Pick<ListParams, 'filters' | 'withDeleted' | 'withRelations'> {
  withThrow?: boolean;
  relations?: Array<string>;
  searchParams: SearchParams;
}

export interface FindOneByOrder<T, R> {
    order: number;
    response?: R;
    complete?: boolean;
    withThrow?: boolean;
    completingData?: (result: T, response: R | T) => Promise<T>;
}

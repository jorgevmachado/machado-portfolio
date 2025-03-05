import React from 'react';

import type { TableProps } from '@repo/ds/components/table/interface';
import { QueryParameters } from '@repo/business/shared/interface';
import { Paginate } from '@repo/business/paginate';

export interface CRUDPageProps<T extends { id: string }> {
  headers: TableProps['headers'];
  saveItem?: (item: Partial<T>) => Promise<T>;
  fetchItems: (params: QueryParameters) => Promise<Paginate<T>>;
  deleteItem?: (param: string) => Promise<{ message: string }>;
  resourceName: string;
  renderItemForm: (params: RenderItemFormParams<T>) => React.ReactNode;
  prepareItemForSave?: (item: unknown) => Partial<T>;
}

interface RenderItemFormParams<T> {
  item: Partial<T>;
  handleChange: (key: keyof T, value: unknown) => void;
}

export type TURLParamKey = 'page' | 'sort' | 'order';

export interface UpdateURLParams {
  page?: string;
  sort?: string;
  order?: string;
}

export interface GetUpdatedUrlParams extends UpdateURLParams {
  searchParams: URLSearchParams;
}

export interface UpdateUrlParams {
  key: TURLParamKey;
  value?: string | null;
  urlSearchParams: URLSearchParams;
}
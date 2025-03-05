import React from 'react';

import type { TIcon } from '../../elements';
import type { TContext } from '../../utils';

export interface TableProps {
  items: Array<unknown>;
  style?: React.CSSProperties;
  headers: Array<TableHeaderItem>;
  actions?: TableActions;
  loading?: boolean;
  onRowClick?(item: unknown): void;
  tableTestId?: string;
  formattedDate?: boolean;
  onChangeOrder?(sortedColumn: SortedColumn): void;
  onSortedColumn?(sortedColumn: SortedColumn): void;
  getClassNameRow?(item: unknown): string;
  currentSortedColumn?: SortedColumn;
}

type TTableHeaderItem = 'string' | 'number' | 'date';

type TableHeaderItem = {
  text: string;
  type?: TTableHeaderItem;
  value: string;
  align?: TAlign;
  style?: React.CSSProperties;
  sortable?: boolean;
};

type TAlign = 'left' | 'right' | 'center';

export type TSort = 'asc' | 'desc' | '';

export type SortItem = {
  [key: string]: string | number;
};

export interface TableActions {
  text?: string;
  edit?: TableActionsItem;
  align?: TAlign;
  delete?: TableActionsItem;
}

export interface TableActionsItem {
  text?: string;
  icon?: TIcon;
  onClick(item: unknown): void;
  context?: TContext;
}

export interface SortedColumn {
  sort: string;
  order: TSort;
}
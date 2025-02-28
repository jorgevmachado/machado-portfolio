import React from 'react';
import type { TIcon } from '@repo/ds/elements/icon/interface';
import type { TContext } from '@repo/ds/utils/colors/interface';

export interface TableProps {
  items: Array<unknown>;
  style?: React.CSSProperties;
  headers: Array<TableHeaderItem>;
  actions?: TableActions;
  tableTestId?: string;
  onRowClick?(item: unknown): void;
  onChangeOrder?(sortedColumn: SortedColumn): void;
  getClassNameRow?(item: unknown): string;
}
type TableHeaderItem = {
  text: string;
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
  order: TSort;
  value: string;
}
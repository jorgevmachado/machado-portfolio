import React from 'react';

import type { TIcon } from '../../elements';
import type { TColors, TContext } from '../../utils';
import { ETypeTableHeaderItem } from './enum';

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
  notFoundMessage?: string;
  currentSortedColumn?: SortedColumn;
}

export type ConditionColor = {
  value: string;
  trueColor: TColors;
  falseColor: TColors;
};

export type TableHeaderItem = {
  text: string;
  type?: ETypeTableHeaderItem;
  value: string;
  align?: TAlign;
  style?: React.CSSProperties;
  sortable?: boolean;
  conditionColor?: ConditionColor;
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
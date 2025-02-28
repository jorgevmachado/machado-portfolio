import {type SortedColumn, SortItem, TableProps, TSort} from './interface';

const resetSortedColumn: SortedColumn = {
  order: '',
  value: '',
};

export function getNewSort(
  header: TableProps['headers'][number],
  sortedColumn: SortedColumn,
): SortedColumn {
  if (sortedColumn.value === header.value) {
    return sortedColumn.order !== 'desc'
      ? { ...sortedColumn, order: 'desc' }
      : resetSortedColumn;
  }
  return { order: 'asc', value: header.value };
}

export function sortItems(order: TSort, key: string, items: Array<unknown>) {
    const itemsCopy = [...items] as Array<SortItem>;
    if (order === 'asc') {
        itemsCopy.sort((a: SortItem, b: SortItem) =>
            a[key] !== undefined && b[key] !== undefined && a[key] < b[key]
                ? -1
                : 1,
        );
    }

    if (order === 'desc') {
        itemsCopy.sort((a: SortItem, b: SortItem) =>
            a[key] !== undefined && b[key] !== undefined && a[key] > b[key]
                ? -1
                : 1,
        );
    }
    return itemsCopy;
}
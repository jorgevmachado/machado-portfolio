import React, { ReactElement, useEffect, useState } from 'react';

import joinClass from '../../utils/join-class/joinClass';

import { useBreakpoint } from '../../hooks';

import { Spinner, Text } from '../../elements';

import type { SortedColumn, TableProps, TSort } from './interface';

import { getNewSort, resetSortedColumn, sortItems } from './sort';
import Header from './header';
import Body from './body';

import './Table.scss';

const Table = ({
  items,
  style,
  headers,
  actions,
  loading,
  onRowClick,
  tableTestId,
  formattedDate = true,
  onChangeOrder,
  onSortedColumn,
  getClassNameRow,
  notFoundMessage,
  currentSortedColumn = resetSortedColumn,
  ...props
}: TableProps): ReactElement => {
  const { isMobile } = useBreakpoint();
  const [currentHeaders, setCurrentHeaders] = useState<TableProps['headers']>(headers);
  const [sortedItems, setSortedItems] = useState([...items]);
  const [sortedColumn, setSortedColumn] =
    useState<SortedColumn>(currentSortedColumn);

  const classList = joinClass([
    'table',
    Boolean(onRowClick) && 'table__action-row',
  ]);

  const handleSort = (header: TableProps['headers'][number]) => {
    const newSort = getNewSort(header, sortedColumn);
    if (sortedColumn.sort === header.value && sortedColumn.order === 'desc') {
      setSortedItems([...items]);
    }
    setSortedColumn(newSort);
    onChangeOrder && onChangeOrder(newSort);
    onSortedColumn && onSortedColumn(newSort);
  };

  const updateTable = (sort: boolean) => {
    if (sortedColumn.sort && !onChangeOrder) {
      const currentItems = sortItems(
        sortedColumn.order as TSort,
        sortedColumn.sort,
        items,
      );
      setSortedItems([...currentItems]);
      return;
    }
    if (!sort) {
      setSortedItems([...items]);
    }
  };

  useEffect(() => {
    updateTable(false);
  }, [items]);

  useEffect(() => {
    updateTable(true);
  }, [sortedColumn.order, sortedColumn.sort]);


  useEffect(() => {
    setCurrentHeaders(headers);
    if(isMobile) {
      setCurrentHeaders((prev) => {
        return prev.map((item) => ({
          ...item,
          align: 'center',
        }))
      });
    }
  }, [isMobile]);

  return loading ? (
    <Spinner />
  ) : (
    <div className={classList} data-testid={tableTestId} {...props}>
      {sortedItems.length === 0 ? (
        <div className="table__no-data-container">
          <Text>{notFoundMessage ? notFoundMessage : 'No data found!!'}</Text>
        </div>
      ) : (
        <table cellSpacing="0" cellPadding="0" style={style}>
          <Header
            headers={currentHeaders}
            actions={actions}
            handleSort={handleSort}
            sortedColumn={sortedColumn}
          />
          <Body
            headers={currentHeaders}
            actions={actions}
            onRowClick={onRowClick}
            tableTestId={tableTestId}
            sortedItems={sortedItems}
            formattedDate={formattedDate}
            getClassNameRow={getClassNameRow}
          />
        </table>
      )}
    </div>
  );
};

export default Table;

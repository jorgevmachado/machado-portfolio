import React from 'react';

import joinClass from '../../../utils/join-class/joinClass';
import Icon from '../../../elements/icon/Icon';

import type { SortedColumn, TableProps } from '../interface';

import './Header.scss';

interface HeaderProps extends Pick<TableProps, 'headers' | 'tableTestId' | 'actions'> {
  handleSort: (header: TableProps['headers'][number]) => void;
  sortedColumn: SortedColumn;

}
export default function Header({
  headers,
  actions,
  handleSort,
  tableTestId,
  sortedColumn,
}: HeaderProps) {
  const sortIcon = (header: TableProps['headers'][number]) => {
    if (header.value === sortedColumn.sort) {
      return sortedColumn.order === 'asc' ? 'chevron-down' : 'chevron-up';
    }
    return 'sort';
  };
  return (
    <thead className="header">
      <tr>
        {headers.map(
          (headerItem: TableProps['headers'][number], headerIndex: number) => (
            <th
              role="columnheader"
              scope="col"
              aria-label={headerItem.text}
              className={joinClass([
                'header__cell',
                Boolean(headerItem.sortable) && 'header__cell--sortable',
              ])}
              key={`table-header-cell-${headerIndex}`}
              onClick={() => headerItem.sortable && handleSort(headerItem)}
              align={headerItem.align ?? 'left'}
              style={headerItem.style}
              data-testid={`${tableTestId}-header-${headerIndex}`}
            >
              <div
                className="header__cell--content"
                style={{
                  justifyContent: headerItem.align ?? 'left',
                }}
              >
                <span>{headerItem.text}</span>
                {headerItem.sortable && (
                  <Icon
                    icon={sortIcon(headerItem)}
                    className={
                      sortedColumn.sort &&
                      sortedColumn.sort === headerItem.value
                        ? 'header__cell--content-icon header__cell--content-icon__active'
                        : 'header__cell--content-icon'
                    }
                    data-testid={`${tableTestId}-sort-icon`}
                  />
                )}
              </div>
            </th>
          ),
        )}
        {actions && (
          <th>
            <div className="header__cell--content" style={{ justifyContent: actions?.align ?? 'center' }}>
              <span>{ actions?.text ?? 'Actions'}</span>
            </div>
          </th>
        )}
      </tr>
    </thead>
  );
}
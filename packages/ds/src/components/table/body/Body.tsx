import React from 'react';

import type { TableProps } from '../interface';
import Actions from '../actions';

interface BodyProps
  extends Pick<
    TableProps,
    | 'getClassNameRow'
    | 'onRowClick'
    | 'tableTestId'
    | 'headers'
    | 'actions'
    | 'formattedDate'
  > {
  sortedItems: Array<unknown>;
}
export default function Body({
  headers,
  actions,
  onRowClick,
  tableTestId,
  sortedItems,
  formattedDate,
  getClassNameRow,
}: BodyProps) {
    const renderValue = (item: unknown, value: string) => {
      return value.split('.').reduce((acc, key) => acc && (acc as Record<string, unknown>)[key], item);
      // if (subValue) {
      //   return (item as Record<string, any>)[value]?.[subValue];
      // }
      // return (item as Record<string, any>)[value];
    }
  const renderData = (
      item: unknown,
      header: TableProps['headers'][number]
  ): React.ReactNode => {
    const value = renderValue(item, header.value)

    if (React.isValidElement(value)) {
      return value;
    }
    if (typeof value === 'string' || typeof value === 'number') {
      return header.type === 'date' && formattedDate
        ? new Date(value).toLocaleDateString()
        : value;
    }
    return null;
  };

  const handleRowClick = (
    event: React.MouseEvent<HTMLTableRowElement>,
    item: unknown,
  ) => {
    event.preventDefault();
    onRowClick && onRowClick(item);
  };
  return (
    <tbody>
      {sortedItems.map((item: unknown, itemIndex: number) => {
        return (
          <tr
            key={`table__row-${itemIndex}`}
            onClick={(event) => handleRowClick(event, item)}
            className={getClassNameRow && getClassNameRow(item)}
            data-testid={`${tableTestId}-row-${itemIndex}`}
          >
            {headers.map((header: TableProps['headers'][number], index) => (
              <td
                key={`${header.value}-${index}`}
                align={header.align ?? 'left'}
                data-testid={`${tableTestId}-column-${index}`}
              >
                {renderData(item, header)}
              </td>
            ))}
            <Actions item={item} actions={actions} />
          </tr>
        );
      })}
    </tbody>
  );
}
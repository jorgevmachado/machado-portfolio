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
  const renderValue = (
    value: unknown,
    type: TableProps['headers'][number]['type'],
  ): React.ReactNode => {
    if (React.isValidElement(value)) {
      return value;
    }
    if (typeof value === 'string' || typeof value === 'number') {
      return type === 'date' && formattedDate
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
      {sortedItems.map((item: any, itemIndex: number) => {
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
                {renderValue(item[header.value], header.type)}
              </td>
            ))}
            <Actions item={item} actions={actions} />
          </tr>
        );
      })}
    </tbody>
  );
}
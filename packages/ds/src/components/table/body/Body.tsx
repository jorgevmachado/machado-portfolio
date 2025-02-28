import React from 'react';

import type { TableProps } from '../interface';
import Actions from '../actions';

interface BodyProps
  extends Pick<
    TableProps,
    'getClassNameRow' | 'onRowClick' | 'tableTestId' | 'headers' | 'actions'
  > {
  sortedItems: Array<unknown>;
}
export default function Body({
  sortedItems,
  getClassNameRow,
  onRowClick,
  tableTestId,
  headers,
  actions,
}: BodyProps) {
  return (
    <tbody>
      {sortedItems.map((item: any, itemIndex: number) => {
        return (
          <tr
            className={getClassNameRow && getClassNameRow(item)}
            key={`table__row-${itemIndex}`}
            onClick={() => onRowClick && onRowClick(item)}
            data-testid={`${tableTestId}-row-${itemIndex}`}
          >
            {headers.map((header: TableProps['headers'][number], index) => (
              <td
                key={`${header.value}-${index}`}
                align={header.align ?? 'left'}
                data-testid={`${tableTestId}-column-${index}`}
              >
                {item[header.value]}
              </td>
            ))}
            <Actions item={item} actions={actions} />
          </tr>
        );
      })}
    </tbody>
  );
}
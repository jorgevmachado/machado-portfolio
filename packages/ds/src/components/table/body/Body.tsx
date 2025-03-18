import React from 'react';

import { currencyFormatter } from '@repo/services/formatter/currency/currency';

import type { TableProps } from '../interface';
import Actions from '../actions';
import { ETypeTableHeaderItem } from '../enum';

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
    return value
      .split('.')
      .reduce((acc, key) => acc && (acc as Record<string, unknown>)[key], item);
  };
  const renderData = (
    item: unknown,
    header: TableProps['headers'][number],
  ): React.ReactNode => {
    const value = renderValue(item, header.value);

    if (React.isValidElement(value)) {
      return value;
    }
    if (typeof value === 'string' || typeof value === 'number') {
      if (header.type === ETypeTableHeaderItem.DATE && formattedDate) {
        return new Date(value).toLocaleDateString();
      }

      if (header.type === ETypeTableHeaderItem.MONEY) {
        const valueNumber =
          typeof value === 'string' ? parseFloat(value) : value;
        return currencyFormatter(valueNumber);
      }

      return value;
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

  const conditionColor = (header: TableProps['headers'][number], item: unknown) => {
    if(!header.conditionColor) {
      return `ds-color-neutral-90`;
    }
    const condition = header.conditionColor.value;
    const conditionValue = (item as Record<string, unknown>)[condition];
    const trueColor = header.conditionColor.trueColor;
    const falseColor = header.conditionColor.falseColor;
    return `ds-color-${conditionValue ? trueColor : falseColor}`;
  }

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
                className={conditionColor(header, item)}
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
import React from 'react';

import type { TableActionsItem, TableProps } from '../interface';

import Button from '../../button';

import './Actions.scss';

interface ActionProps extends Pick<ActionsProps, 'item'> {
  type: 'edit' | 'delete';
  action: TableActionsItem;
}

function Action({ type, item, action }: ActionProps) {
  const defaultContext = type === 'edit' ? 'attention' : 'error';
  const defaultText = type === 'edit' ? 'Edit' : 'Delete';

  const handleCLick = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: unknown,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    action?.onClick(item);
  };
  return (
    <Button
      icon={action?.icon}
      appearance={action?.icon ? 'icon' : 'standard'}
      context={action.context ?? defaultContext}
      onClick={(event) => handleCLick(event, item)}
    >
      {!action?.icon && (action?.text || defaultText)}
    </Button>
  );
}

interface ActionsProps extends Pick<TableProps, 'actions'> {
  item: TableProps['items'][number];
}
export default function Actions({ actions, item }: ActionsProps) {
  return (
    actions && (
      <td
        className="actions"
        style={{ justifyContent: actions?.align ?? 'center' }}
      >
        {actions.edit && (
          <Action type="edit" item={item} action={actions.edit} />
        )}
        {actions.delete && (
          <Action type="delete" item={item} action={actions.delete} />
        )}
      </td>
    )
  );
}

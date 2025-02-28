import type { TableProps, TableActionsItem } from '../interface';

import Button from '../../button';

import './Actions.scss';

interface ActionProps extends Pick<ActionsProps, 'item'> {
  type: 'edit' | 'delete';
  action: TableActionsItem;
}

function Action({ type, item, action }: ActionProps) {
  const defaultContext = type === 'edit' ? 'attention' : 'error';
  const defaultText = type === 'edit' ? 'Edit' : 'Delete';
  return (
    <Button
      icon={action?.icon}
      context={action.context ?? defaultContext}
      onClick={() => action?.onClick(item)}
    >
      {!action?.icon && (action?.text || defaultText)}
    </Button>
  );
}

interface ActionsProps extends Pick<TableProps, 'actions'> {
  item: TableProps['items'][number];
}
export default function Actions({ actions, item}: ActionsProps) {
  return (
      actions && (
          <td className="actions" style={{ justifyContent: actions?.align ?? 'center' }}>
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

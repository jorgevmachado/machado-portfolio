import React from 'react';

import { Menu } from '../../../utils';

import Button from '@repo/ds/components/button/Button';
import Dropdown from '@repo/ds/components/dropdown/Dropdown';
import { TContext } from '@repo/ds/utils/colors/interface';
import { TIcon } from '@repo/ds/utils/icons/interface';

export interface SidebarActionProps {
  icon?: TIcon;
  path?: string;
  label: string;
  items?: Menu['items'];
  context?: TContext;
  counter?: number;
  className?: string;
  onRedirect?: () => void;
}

export default function SidebarAction({
  icon,
  label,
  items,
  context,
  counter,
  className,
  onRedirect,
}: SidebarActionProps) {
  const type = !items?.length ? 'button' : 'dropdown';

  return (
    <li className={className}>
      {type !== 'button' ? (
        <Dropdown label={label} type="button" context={context}>
          {items?.map((item) => (
            <Button
              key={item.key}
              context={context}
              onClick={item.onRedirect}
              iconPosition="left"
            >
              {item.label}
            </Button>
          ))}
        </Dropdown>
      ) : (
        <Button
          icon={icon}
          context={context}
          onClick={onRedirect}
          iconPosition="left"
          notificationCounter={counter}
        >
          {label}
        </Button>
      )}
    </li>
  );
}

import React, { useMemo } from 'react';

import type { TContext } from '../../../utils';

import type { TDropdown } from '../interface';

import Button from '../../button';
import Link from '../../link';

export interface ActivatorProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: TDropdown;
  label: string;
  isOpen?: boolean;
  onClick?: () => void;
  context: TContext;
}

export default function Activator({
  type = 'button',
  label,
  isOpen,
  onClick,
  context,
  className,
  ...props
}: ActivatorProps) {
  const icon = useMemo(() => (isOpen ? 'arrow-up' : 'arrow-down'), [isOpen]);

  return (
    <div {...props} className={className}>
      {type === 'button' ? (
        <Button
          icon={icon}
          type={type}
          iconSize="1.5em"
          onClick={onClick}
          context={context}
          iconPosition="right"
        >
          {label}
        </Button>
      ) : (
        <Link
          icon={icon}
          onClick={onClick}
          context={context}
          iconPosition="right"
        >
          {label}
        </Link>
      )}
    </div>
  );
}

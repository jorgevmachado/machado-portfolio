import React from 'react';

import { TContext } from '../../utils';

export type TDropdown = 'link' | 'button';

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: TDropdown;
  label?: string;
  isOpen?: boolean;
  context?: TContext;
  disabled?: boolean;
  children?: React.ReactNode;
  activator?: React.ReactNode;
  onClickOutside?: (value: boolean) => void;
  onDropDownClick?: (value: boolean) => void;
}

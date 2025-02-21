import {
  ciGroup,
  fa6Group,
  faGroup,
  giGroup,
  io5Group,
  ioGroup,
  mdGroup,
  type TIconGroups,
  vscGroup,
} from './groups';
import type { TIcon, TIconGroup } from './interface';
import type { TColors } from '../../utils';
import React from 'react';

const DEFAULT_ICON = faGroup.react;

const ICON_GROUPS: TIconGroups = {
  ci: ciGroup,
  fa: faGroup,
  fa6: fa6Group,
  gi: giGroup,
  io: ioGroup,
  io5: io5Group,
  md: mdGroup,
  vsc: vscGroup,
};

interface GetIconParams {
  name: TIcon;
  size?: string | number;
  color?: TColors;
  group?: TIconGroup;
}

export function getIcon({ name, size, color, group }: GetIconParams) {
  const iconComponent = !group
    ? getIconByDefaultGroup(name)
    : getIconByGroup(name, group);
  return buildWithCustomProps(iconComponent, size, color);
}

function getIconByGroup(name: TIcon, group: TIconGroup) {
  const iconByGroup = ICON_GROUPS[group][name];
  if (!iconByGroup) {
    return getIconInAllGroups(name) ?? DEFAULT_ICON;
  }
  return iconByGroup;
}

function getIconByDefaultGroup(name: TIcon) {
  const iconDefaultGroup = ICON_GROUPS['fa'][name];
  if (!iconDefaultGroup) {
    return getIconInAllGroups(name) ?? DEFAULT_ICON;
  }
  return iconDefaultGroup;
}

function getIconInAllGroups(name: TIcon) {
  for (const grp of Object.values(ICON_GROUPS)) {
    const icon = grp[name];
    if (icon) {
      return icon;
    }
  }
}

function buildWithCustomProps(
  IconComponent: React.ComponentType | React.ReactNode,
  size: string | number = '1em',
  color?: TColors,
) {
  if (React.isValidElement(IconComponent)) {
    return React.cloneElement(IconComponent as React.ReactElement<any>, { size, color });
  }
  if (typeof IconComponent === 'function' || typeof IconComponent === 'object') {
    const Component = IconComponent as React.ComponentType<{ size: string | number; color?: string; }>;
    return <Component size={size} color={color} />;
  }
  return IconComponent;
}

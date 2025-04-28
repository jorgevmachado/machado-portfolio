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

export const ICON_GROUPS: TIconGroups = {
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
  withDefault?: boolean;
}

interface GetIconResult {
  icon?: React.ReactNode;
  group?: TIconGroup;
}
export function getIcon({ name, size, color, group, withDefault = true }: GetIconParams): GetIconResult {
  const { icon, group: iconGroup } = !group
    ? getIconByDefaultGroup(name)
    : getIconByGroup(name, group, withDefault);

  if (icon) {
    return {
      icon: buildWithCustomProps(icon, size, color),
      group: iconGroup,
    };
  }

  if(!withDefault) {
    return {
      icon: undefined,
      group: undefined,
    };
  }

  return {
    icon: DEFAULT_ICON,
    group: 'fa',
  };
}

function getIconByGroup(name: TIcon, group: TIconGroup, withDefault: boolean): GetIconResult {
  const iconByGroup = ICON_GROUPS[group][name];
  if (!iconByGroup) {
    return withDefault ? getIconInAllGroups(name) : { icon: undefined, group: undefined};
  }
  return {
    icon: iconByGroup,
    group,
  };
}

function getIconByDefaultGroup(name: TIcon): GetIconResult {
  const iconDefaultGroup = ICON_GROUPS['fa'][name];
  if (!iconDefaultGroup) {
    return getIconInAllGroups(name);
  }
  return {
    icon: iconDefaultGroup,
    group: 'fa',
  };
}

function getIconInAllGroups(name: TIcon): GetIconResult {
  for (const [group, icons] of Object.entries(ICON_GROUPS)) {
    const icon = icons[name];
    if (icon) {
      return { icon, group: group as TIconGroup };
    }
  }
  return { icon: undefined, group: undefined };
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

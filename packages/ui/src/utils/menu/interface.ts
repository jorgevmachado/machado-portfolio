import React from 'react';

import type { TIcon } from '@repo/ds/utils/icons';

export interface MenuItem {
  key: string;
  icon?: TIcon;
  href?: string;
  label: string;
  items?: Array<MenuItem>;
  counter?: number;
  onRedirect?: () => void;
}

export interface Menu {
  key: 'navbar' | 'sidebar';
  items: Array<MenuItem>;
}

export interface Logo extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  title: string;
  width?: number;
  height?: number;
}

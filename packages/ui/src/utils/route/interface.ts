import React from 'react';

import type { TIcon } from '@repo/ds/elements/icon/interface';

export interface Route {
  key: string;
  icon?: TIcon;
  path: string;
  type: 'public' | 'private';
  title: string;
  element: React.ReactElement;
  children?: Array<Route>;
}

export interface FormatPathParams {
  childPath: string;
  parentPath: string;
  grandParentPath?: string;
}
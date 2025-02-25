import React from 'react';

import type { TIcon } from '@repo/ds/elements/icon/interface';

export interface RouteProps {
  key: string;
  icon?: TIcon;
  path: string;
  type: 'public' | 'private';
  title: string;
  element: React.ReactElement;
  children?: Array<RouteProps>;
}
import React from 'react';

import type { TIcon } from '@repo/ds/elements/icon/interface';

export type TRoute = 'public' | 'private';

export interface RouteProps {
  key: string;
  icon?: TIcon;
  path: string;
  type: TRoute;
  title: string;
  element?: React.ReactElement;
  children?: Array<RouteProps>;
}
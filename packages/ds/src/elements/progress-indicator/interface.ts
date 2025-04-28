import React from 'react';

import type { TContext } from '../../utils';

export interface ProgressIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  total: number;
  current: number;
  context?: TContext;
}
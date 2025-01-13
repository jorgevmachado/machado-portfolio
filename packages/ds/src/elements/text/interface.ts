import React from 'react';

import type { TVariant, TWeight } from '../../utils/fonts';
import type { TColors } from '../../utils/colors';

export interface TextProps extends React.HTMLProps<Element> {
  readonly tag?: string;
  readonly color?: TColors;
  readonly weight?: TWeight;
  readonly variant?: TVariant;
  readonly htmlFor?: string;
  readonly children: React.ReactNode | string;
}

export interface FormattedText {
  cleaned: Array<string | React.JSX.Element>;
  replaced?: Array<string | React.JSX.Element>;
}

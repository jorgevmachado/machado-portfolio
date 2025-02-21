import React from 'react';

import type { TColors } from '../../utils';
import joinClass from '../../utils/join-class';

import { Text } from '../../elements/text';

import './Label.scss';

export type TTag = 'label' | 'legend';

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  tip?: string;
  tag?: TTag;
  color?: TColors;
  label?: string;
  componentId?: string;
}

export default function Label({
  tip,
  tag = 'label',
  color,
  label,
  componentId,
  className,
  ...props
}: LabelProps) {
  const tipId = componentId ? `${componentId}-tip` : undefined;

  const classNameList = joinClass(['label', className]);

  return (
    <div {...props} className={classNameList}>
      {label && (
        <Text
          tag={tag}
          color={color}
          htmlFor={tag === 'label' ? componentId : undefined}
          className="label__text"
          aria-describedby={tip ? tipId : undefined}
        >
          {label}
        </Text>
      )}
      {tip && (
        <Text id={tipId} color={color} tag="span" variant="small">
          {tip}
        </Text>
      )}
    </div>
  );
}

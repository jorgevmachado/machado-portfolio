import React from 'react';

import joinClass from '../../utils/join-class';

import Text from '../../elements/text';

import './Label.scss';

export type TTag = 'label' | 'legend';

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  tip?: string;
  tag?: TTag;
  label?: string;
  componentId?: string;
}

export default function Label({
  tip,
  tag = 'label',
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
          htmlFor={tag === 'label' ? componentId : undefined}
          className="label__text"
          aria-describedby={tip ? tipId : undefined}
        >
          {label}
        </Text>
      )}
      {tip && (
        <Text id={tipId} tag="span" color="neutral-90" variant="small">
          {tip}
        </Text>
      )}
    </div>
  );
}

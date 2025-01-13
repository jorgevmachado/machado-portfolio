import React from 'react';

import joinClass from '../../utils/join-class';

import Text from '../../elements/text';

import './Label.scss';

export type TTag = 'label' | 'legend';

interface LabelProps extends React.HTMLProps<HTMLDivElement> {
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
  const classNameList = joinClass(['label', className]);

  return (
    <div {...props} className={classNameList}>
      {label && (
        <Text tag={tag} htmlFor={componentId} className="label__text">
          {label}
        </Text>
      )}
      {tip && (
        <Text
          tag="span"
          color="neutral-90"
          className="label__tip"
          variant="small"
        >
          {tip}
        </Text>
      )}
    </div>
  );
}

import React from 'react';

import { joinClass } from '../../utils';

import type { ProgressIndicatorProps } from './interface';

import './ProgressIndicator.scss';

export default function ProgressIndicator({
  total,
  current,
  context = 'primary',
  className,
  ...props
}: ProgressIndicatorProps) {
  const render = () => {
    const data = [];

    for (let i = 1; i <= total; i++) {
      data.push(
        <span
          key={`page-${i}`}
          className={`progress-indicator__item ${
            current === i ? `progress-indicator__item--context-${context}` : ''
          }`}
        />,
      );
    }

    return data;
  };
  const classNameList = joinClass(['progress-indicator', className]);

  return (
    <div className={classNameList} {...props}>
      {render()}
    </div>
  );
}
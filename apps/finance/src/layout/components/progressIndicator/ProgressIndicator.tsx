import React, { ReactElement } from 'react';

import './ProgressIndicator.scss';
import { TContext } from '@repo/ds/utils/colors/interface';

export interface ProgressIndicatorProps {
  totalDots: number;
  currentDot: number;
  context?: TContext;
}

const ProgressIndicator = ({
  totalDots,
  currentDot,
  context = 'primary',
  ...props
}: ProgressIndicatorProps): ReactElement => {
  const renderDots = () => {
    const dots = [];

    for (let i = 1; i <= totalDots; i++) {
      dots.push(
        <span
          key={`page-${i}`}
          className={`l-progress-indicator__dot ${
            currentDot === i ? `l-progress-indicator--context-${context}` : ''
          }`}
        />,
      );
    }

    return dots;
  };

  return (
    <div className="l-progress-indicator" {...props}>
      {renderDots()}
    </div>
  );
};

export default ProgressIndicator;

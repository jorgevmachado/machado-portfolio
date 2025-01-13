import React from 'react';

import joinClass from '../../utils/join-class';

import { TooltipProps } from './interface';

import './Tooltip.scss';

export default function Tooltip({
  align = 'bottom',
  title,
  content,
  context = 'neutral',
  children,
  ...props
}: TooltipProps) {
  const classNameList = joinClass([
    'tooltip__container',
    `tooltip__context--${context}`,
  ]);

  const bodyClassNameList = joinClass([
    'tooltip__container--body',
    `tooltip__container--align-${align}`,
  ]);

  return (
    <span
      tabIndex={0}
      className={classNameList}
      aria-describedby={title ? `${title}: ${content}` : content}
      {...props}
    >
      {children}
      <div role="tooltip" aria-hidden="true" className={bodyClassNameList}>
        <div className="tooltip__container--body-caret" />

        <div className="tooltip__container--body-content">
          {title && (
            <div className="tooltip__container--body-content__title">
              {title}
            </div>
          )}
          {content}
        </div>
      </div>
    </span>
  );
}

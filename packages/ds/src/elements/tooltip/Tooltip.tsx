import React, { useEffect, useState } from 'react';

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
  const [isVisible, setIsVisible] = useState(false);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const handleTouchDetection = () => setIsTouchDevice(true);

    window.addEventListener('touchstart', handleTouchDetection);

    return () => {
      window.removeEventListener('touchstart', handleTouchDetection);
    };
  }, []);

  const classNameList = joinClass(
    ['tooltip__container', context && `tooltip__context--${context}`].filter(
      Boolean,
    ),
  );

  const bodyClassNameList = joinClass(
    [
      'tooltip__container--body',
      align && `tooltip__container--align-${align}`,
      isVisible && 'tooltip__container--visible',
    ].filter(Boolean),
  );

  const handleToggle = () => {
    if (isTouchDevice) {
      setIsVisible((prev) => !prev);
    }
  };

  const handleBlur = () => {
    if (isTouchDevice) {
      setIsVisible(false);
    }
  };

  const titleId = title ? `${title}-tooltip-title` : undefined;
  const contentId = `${title || 'tooltip'}-tooltip-content`;

  return (
    <span
      role="button"
      tabIndex={0}
      onBlur={handleBlur}
      onClick={handleToggle}
      onMouseEnter={() => !isTouchDevice && setIsVisible(true)}
      onMouseLeave={() => !isTouchDevice && setIsVisible(false)}
      className={classNameList}
      aria-labelledby={titleId}
      aria-describedby={contentId}
      aria-expanded={isVisible}
      {...props}
    >
      {children}
      {isVisible && (
        <div role="tooltip" aria-hidden="true" className={bodyClassNameList}>
          <div className="tooltip__container--body-caret" />

          <div className="tooltip__container--body-content">
            {title && (
              <div
                id={titleId}
                className="tooltip__container--body-content__title"
              >
                {title}
              </div>
            )}
            <div id={contentId}>{content}</div>
          </div>
        </div>
      )}
    </span>
  );
}

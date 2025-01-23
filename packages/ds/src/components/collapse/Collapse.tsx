import React, { useState } from 'react';

import type { TContext, TIconPosition } from '../../utils';
import joinClass from '../../utils/join-class';
import useGenerateComponentId from '../../hooks/use-generate-component-id';

import Button from '../button';
import Link from '../link';

import './Collapse.scss';

interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  hasIcon?: boolean;
  context?: Omit<TContext, 'error' | 'attention'>;
  children: React.ReactNode;
  openedText?: string;
  closedText?: string;
  onActionClick?: (isExpanded: boolean) => void;
  actionComponent?: 'button' | 'link';
  showActionComponent?: boolean;
}

export default function Collapse({
  hasIcon,
  context = 'neutral',
  children,
  className = '',
  openedText = 'Show less',
  closedText = 'Show more',
  onActionClick,
  actionComponent = 'link',
  showActionComponent,
  ...props
}: CollapseProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(!showActionComponent);
  const componentId = useGenerateComponentId('collapse-');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onActionClick && onActionClick(newExpandedState);
  };

  const getToggleLabel = () => (isExpanded ? openedText : closedText);

  const classNameList = joinClass([
    'collapse',
    (!showActionComponent || isExpanded) && 'collapse__expanded',
    className,
  ]);

  return (
    <div
      {...props}
      id={componentId}
      data-testid="collapse"
      className={classNameList}
    >
      <div className="collapse__content">{children}</div>
      {showActionComponent &&
        React.createElement(
          actionComponent === 'link'
            ? (Link as React.ElementType)
            : (Button as React.ElementType),
          {
            href: actionComponent === 'link' ? `#${componentId}` : undefined,
            icon: hasIcon
              ? isExpanded
                ? 'arrow-up'
                : 'arrow-down'
              : undefined,
            role: actionComponent,
            type: actionComponent,
            onClick: handleClick,
            context: context as TContext,
            className: `collapse__${actionComponent}`,
            iconPosition: 'right' as TIconPosition,
            'aria-expanded': isExpanded,
            'aria-controls': componentId,
          },
          getToggleLabel(),
        )}
    </div>
  );
}

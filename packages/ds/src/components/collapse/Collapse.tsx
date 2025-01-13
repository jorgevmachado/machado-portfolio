import React, { useEffect, useState } from 'react';

import type { TContext } from '../../utils/colors';
import joinClass from '../../utils/join-class';
import useGenerateComponentId from '../../utils/use-generate-component-id';

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
  openedText = 'Show less',
  closedText = 'Show more',
  onActionClick,
  actionComponent = 'link',
  showActionComponent,
  ...props
}: CollapseProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const componentId = useGenerateComponentId('collapse-');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onActionClick && onActionClick(newExpandedState);
  };

  const getLabel = () => (isExpanded ? openedText : closedText);

  useEffect(() => {
    if (!showActionComponent) {
      setIsExpanded(true);
    }
  }, []);

  const classNameList = joinClass([
    'collapse',
    `${!showActionComponent || isExpanded ? 'collapse__expanded' : ''}`,
    props.className,
  ]);
  return (
    <div {...props} data-testid="collapse" className={classNameList}>
      <div className="collapse__content">{children}</div>
      {showActionComponent && actionComponent === 'link' && (
        <Link
          icon={hasIcon ? (isExpanded ? 'arrow-up' : 'arrow-down') : undefined}
          href={`#${componentId}`}
          role="link"
          onClick={handleClick}
          context={context as TContext}
          className="collapse__link"
          iconPosition="right"
          aria-expanded={isExpanded}
          aria-controls={componentId}
        >
          {getLabel()}
        </Link>
      )}
      {showActionComponent && actionComponent === 'button' && (
        <Button
          icon={hasIcon ? (isExpanded ? 'arrow-up' : 'arrow-down') : undefined}
          role="link"
          onClick={handleClick}
          context={context as TContext}
          className="collapse__button"
          aria-expanded={isExpanded}
          aria-controls={componentId}
        >
          {getLabel()}
        </Button>
      )}
    </div>
  );
}

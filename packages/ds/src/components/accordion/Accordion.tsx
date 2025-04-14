import React, { useCallback } from 'react';

import type { TContext } from '../../utils';

import joinClass from '../../utils/join-class';
import useGenerateComponentId from '../../hooks/use-generate-component-id';

import { Icon, Text } from '../../elements';

import './Accordion.scss';
import useAccordionState from './useAccordionState';

type AccordionProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle'> & {
  title: string;
  isOpen?: boolean;
  context?: TContext;
  onToggle?: (isOpen: boolean) => void;
  subtitle?: string;
  disabled?: boolean;
  children: React.ReactNode;
  iconFormat?: 'small' | 'big';
  isBorderless?: boolean;
  childrenTitle?: React.ReactNode;
};

export default function Accordion ({
  title,
  isOpen,
  context = 'neutral',
  onToggle,
  children,
  subtitle,
  disabled,
  className,
  iconFormat = 'small',
  isBorderless,
  childrenTitle,
  ...props
}: AccordionProps)  {
  const { isOpenModel, toggleOpen } = useAccordionState(isOpen, onToggle);

  const componentId = useGenerateComponentId(title);

  const classNameList = joinClass([
    'accordion',
    isBorderless && 'accordion__borderless',
    context && `accordion__context--${context}`,
    isOpenModel && 'accordion__open',
    disabled && 'accordion__disabled',
    className && className,
  ]);

  const handleToggle = useCallback(() => {
    if (!disabled) {
      toggleOpen();
    }
  }, [disabled, toggleOpen]);

  return (
    <div
      {...props}
      role="presentation"
      tabIndex={disabled ? -1 : 0}
      className={classNameList}
    >
      <button
        id={`${componentId}-accordion-button`}
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className="accordion__button"
        aria-disabled={disabled}
        aria-expanded={isOpenModel}
        aria-controls={`${componentId}-accordion-content`}
      >

        <div className="accordion__button--title">
          {childrenTitle ? childrenTitle : (<Text variant="regular">{title}</Text>)}
          {subtitle && <Text variant="regular">{subtitle}</Text>}
        </div>
        <Icon
          icon="arrow-down-outline"
          size={iconFormat === 'big' ? '2em' : '1.5em'}
          color={`${context}-80`}
          className="accordion__button--arrow-icon"
        />
      </button>
      <div
        id={`${componentId}-accordion-content`}
        role="region"
        className="accordion__content"
        aria-labelledby={`${componentId}-accordion-content`}
      >
        {children}
      </div>
    </div>
  );
};
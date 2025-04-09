import React, { useEffect, useState } from 'react';

import type { TContext } from '../../utils';

import joinClass from '../../utils/join-class';
import useGenerateComponentId from '../../hooks/use-generate-component-id';

import { Icon, Text } from '../../elements';

import './Accordion.scss';

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  isOpen?: boolean;
  context?: TContext;
  children: React.ReactNode;
  subtitle?: string;
  disabled?: boolean;
  iconFormat?: 'small' | 'big';
  isBorderless?: boolean;
  childrenTitle?: React.ReactNode;
}

export default function Accordion({
  title,
  isOpen,
  context = 'neutral',
  children,
  subtitle,
  disabled,
  className,
  iconFormat = 'small',
  isBorderless,
  childrenTitle,
  ...props
}: AccordionProps) {
  const [isOpenModel, setIsOpenModel] = useState(
    isOpen !== undefined ? isOpen : false,
  );

  const componentId = useGenerateComponentId(title);

  const classNameList = joinClass([
    'accordion',
    isBorderless && 'accordion__borderless',
    context && `accordion__context--${context}`,
    isOpenModel && 'accordion__open',
    disabled && 'accordion__disabled',
    className && className,
  ]);

  const toggleOpen = React.useCallback(
    () => setIsOpenModel((open) => !open),
    [],
  );

  useEffect(() => {
    if (isOpen !== undefined) {
      setIsOpenModel(isOpen);
    }
  }, [isOpen]);

  return (
    <div {...props} tabIndex={disabled ? -1 : 0} className={classNameList}>
      <button
        id={`${componentId}-accordion-button`}
        role="button"
        type="button"
        onClick={toggleOpen}
        tabIndex={-1}
        disabled={disabled}
        className="accordion__button"
        aria-disabled={disabled}
        aria-expanded={isOpenModel}
        aria-controls={`${componentId}-accordion-button-content`}
      >
        {childrenTitle ? (
          <div className="accordion__button--title">{childrenTitle}</div>
        ) : (
            <div className="accordion__button--text">
              <Text variant="regular" weight="bold">
                {title}
              </Text>
              {subtitle && (
                <Text variant="regular">
                  {subtitle}
                </Text>
              )}
            </div>
        )}

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
}

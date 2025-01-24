import React, { useMemo } from 'react';

import type { TContext } from '../../utils';
import joinClass from '../../utils/join-class';

import { Icon, Text } from '../../elements';

import './StepBar.scss';

type Step = {
  title: string;
  label: string;
};

export interface LStepBarProps {
  readonly items?: Array<Step>;
  readonly minimal?: boolean;
  readonly context?: Omit<TContext, 'error' | 'attention'>;
  readonly vertical?: boolean;
  readonly totalSteps?: number;
  readonly dataTestId?: string;
  readonly currentStep: number;
  readonly minimalLabel?: string;
}

export default function StepBar({
  items,
  minimal,
  context = 'neutral',
  vertical = false,
  totalSteps,
  dataTestId,
  currentStep,
  minimalLabel,
  ...props
}: LStepBarProps) {
  const isChecked = (index: number) => {
    return index + 1 < currentStep;
  };

  const itemsLength = items ? items.length : 0;
  const total = totalSteps ? totalSteps : itemsLength;

  const renderHeaderStatus = (i: number) => {
    return (
      <div className="step-bar__item--header-status">
        {isChecked(i) ? <Icon icon="check" /> : i + 1}
      </div>
    );
  };

  const renderBar = (i: number) => {
    return (
      <div
        className={joinClass([
          'step-bar__item--header-bar',
          `${isChecked(i) ? 'step-bar__item--header-bar__checked' : ''}`,
        ])}
      />
    );
  };

  const renderSteps = () => {
    const itemsToShow: Array<React.ReactNode> = [];

    for (let i = 0; i < total; i++) {
      const liClassNameList = joinClass([
        'step-bar__item',
        `${isChecked(i) ? 'step-bar__item--checked' : ''}`,
        `${currentStep === i + 1 ? 'step-bar__item--current' : ''}`,
      ]);

      itemsToShow.push(
        <li
          role="listitem"
          key={`step-bar__item-${i}`}
          aria-label={
            isChecked(i)
              ? `Step ${i + 1} completed`
              : currentStep === i + 1
                ? `Step ${i + 1} current`
                : `Step ${i + 1}`
          }
          style={{ width: `calc(100% / ${vertical ? 1 : total})` }}
          className={liClassNameList}
          data-testid={`${dataTestId}-step-${i}`}
          aria-current={currentStep === i + 1 ? 'step' : undefined}
        >
          <div className="step-bar__item--header">
            {!minimal && (
              <>
                {renderHeaderStatus(i)}
                {items && <Text tag="p">{items[i]?.title}</Text>}
              </>
            )}
            {!vertical && renderBar(i)}
          </div>
          {!minimal && items && (
            <div className="step-bar__item--label">{items[i]?.label}</div>
          )}
        </li>,
      );
    }
    return itemsToShow;
  };

  const steps = useMemo(() => {
    return renderSteps();
  }, [items, totalSteps, currentStep, vertical, minimal]);

  const classNameList = joinClass([
    'step-bar',
    `${vertical ? 'step-bar__vertical' : ''}`,
    `${minimal ? 'step-bar__minimal' : ''}`,
    `step-bar__context--${context}`,
  ]);

  const wrapperClassNameList = joinClass([
    'step-bar__wrapper',
    `${vertical ? 'step-bar__wrapper--vertical' : ''}`,
  ]);

  return minimalLabel ? (
    <div
      className={wrapperClassNameList}
      data-testid={`${dataTestId}-wrapper-label`}
    >
      <div className="step-bar__wrapper--text">
        <Text tag="p" weight="bold">
          {minimalLabel}
        </Text>
        <Text
          tag="p"
          variant="small"
          weight="normal"
          data-testid={`${dataTestId}-step-info`}
        >
          Etapa <b>{currentStep}</b> de {total}
        </Text>
      </div>
      <ul
        role="list"
        tabIndex={-1}
        aria-label="Step progress bar"
        aria-labelledby={`${dataTestId}-step-info`}
        className={classNameList}
        data-testid={dataTestId}
        {...props}
      >
        {steps}
      </ul>
    </div>
  ) : (
    <ul
      tabIndex={-1}
      className={classNameList}
      data-testid={dataTestId}
      {...props}
    >
      {steps}
    </ul>
  );
}

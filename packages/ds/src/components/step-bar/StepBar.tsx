import React from 'react';

import type { TContext } from '../../utils/colors';
import joinClass from '../../utils/join-class';

import Icon from '../../elements/icon';
import Text from '../../elements/text';

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

  const renderSteps = () => {
    const itemsToShow: Array<React.ReactNode> = [];

    for (let i = 0; i < total; i++) {
      const liClassNameList = joinClass([
        'step-bar__item',
        `${isChecked(i) ? 'step-bar__item--checked' : ''}`,
        `${currentStep === i + 1 ? 'step-bar__item--current' : ''}`,
      ]);

      const barClassNameList = joinClass([
        'step-bar__item--header-bar',
        `${isChecked(i) ? 'step-bar__item--header-bar__checked' : ''}`,
      ]);

      itemsToShow.push(
        <li
          key={`step-bar__item-${i}`}
          style={{ width: `calc(100% / ${vertical ? 1 : total})` }}
          className={liClassNameList}
          data-testid={`${dataTestId}-step-${i}`}
        >
          <div className="step-bar__item--header">
            {!minimal && (
              <>
                <div className="step-bar__item--header-status">
                  {isChecked(i) && <Icon icon="check" />}
                  {!isChecked(i) && i + 1}
                </div>
                {items && <Text tag="p">{items[i]?.title}</Text>}
              </>
            )}
            {!vertical && <div className={barClassNameList} />}
          </div>
          {!minimal && items && (
            <div className="step-bar__item--label">{items[i]?.label}</div>
          )}
        </li>,
      );
    }
    return itemsToShow;
  };

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
        tabIndex={-1}
        className={classNameList}
        data-testid={dataTestId}
        {...props}
      >
        {renderSteps()}
      </ul>
    </div>
  ) : (
    <ul
      tabIndex={-1}
      className={classNameList}
      data-testid={dataTestId}
      {...props}
    >
      {renderSteps()}
    </ul>
  );
}

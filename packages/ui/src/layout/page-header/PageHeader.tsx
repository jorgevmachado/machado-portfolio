import React from 'react';

import Text from '@repo/ds/elements/text/Text';
import Button from '@repo/ds/components/button/Button';

import type {TColors, TContext} from '@repo/ds/utils/colors/interface';

import './PageHeader.scss';

type CRUDHeaderPropsButton = {
  label?: string;
  onClick: () => void;
  context?: TContext;
};

type CRUDHeaderProps = {
  color?: TColors;
  title?: string;
  button?: CRUDHeaderPropsButton;
  resourceName?: string;
};

export default function PageHeader({
  color = 'info-80',
  title,
  button,
  resourceName = 'Resource',
}: CRUDHeaderProps) {
  const resourceTitle = title ?? `Management of ${resourceName}`;
  const buttonLabel = button?.label ?? `Create new ${resourceName}`;
  const buttonContext = button?.context ?? 'success';
  return (
    <div className="page-header">
      <Text tag="h1" variant="big" color={color} className="page-header__title">
        {resourceTitle}
      </Text>
      {button && (
        <Button onClick={button.onClick} context={buttonContext} className="page-header__button">
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}

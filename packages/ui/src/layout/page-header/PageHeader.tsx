import React from 'react';

import Text from '@repo/ds/elements/text/Text';
import Button from '@repo/ds/components/button/Button';

import type { TContext } from '@repo/ds/utils/colors/interface';

import './PageHeader.scss';

type CRUDHeaderPropsButton = {
  label?: string;
  onClick: () => void;
};

type CRUDHeaderProps = {
  title?: string;
  button?: CRUDHeaderPropsButton;
  context?: TContext;
  resourceName?: string;
};

export default function PageHeader({
  title,
  button,
  context = 'success',
  resourceName = 'Resource',
}: CRUDHeaderProps) {
  const resourceTitle = title ?? `Management of ${resourceName}`;
  const buttonLabel = button?.label ?? `Create new ${resourceName}`;
  return (
    <div className="page-header">
      <Text tag="h1" variant="big" color="info-80">
        {resourceTitle}
      </Text>
      {button && (
        <Button onClick={button.onClick} context={context}>
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}

import React from 'react';

import Text from '@repo/ds/elements/text/Text';
import Button from '@repo/ds/components/button/Button';

import { TContext } from '@repo/ds/utils/colors/interface';

import './Header.scss';

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

export default function Header({
  title,
  button,
  context = 'success',
  resourceName = 'Resource',
}: CRUDHeaderProps) {
  const resourceTitle = title ?? `Management of ${resourceName}`;
  const buttonLabel = button?.label ?? `Create new ${resourceName}`;
  return (
    <div className="crud-header">
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

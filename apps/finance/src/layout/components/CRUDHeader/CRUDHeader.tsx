import React from 'react';

import Text from '@repo/ds/elements/text/Text';
import Button from '@repo/ds/components/button/Button';

import './CRUDHeader.scss';
import { TContext } from '@repo/ds/utils/colors/interface';

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

const CRUDHeader: React.FC<CRUDHeaderProps> = ({
  title,
  button,
  context = 'success',
  resourceName = 'Resource',
}) => {
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
};

export default CRUDHeader;
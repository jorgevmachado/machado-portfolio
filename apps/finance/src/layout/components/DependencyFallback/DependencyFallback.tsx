import React from 'react';

import Text from '@repo/ds/elements/text/Text';
import Button from '@repo/ds/components/button/Button';

import './DependencyFallback.scss';

type DependencyFallbackPropsButton = {
  label: string;
  onClick: () => void;
};

type DependencyFallbackProps = {
  button?: DependencyFallbackPropsButton;
  message?: string;
  resourceName?: string;
  dependencyName?: string;
};

const DependencyFallback: React.FC<DependencyFallbackProps> = ({
  button,
  message,
  resourceName = 'Resource',
  dependencyName = 'Dependency',
}) => {
  const resultMessage = message
    ? message
    : `No list of ${dependencyName} were found. Please create a ${dependencyName} before creating a ${resourceName}!!`;
  return (
    <div className="dependency-fallback">
      <Text>{resultMessage}</Text>
      {button && (
        <Button
          className="dependency-fallback__button"
          onClick={button.onClick}
        >
          {button.label}
        </Button>
      )}
    </div>
  );
};

export default DependencyFallback;
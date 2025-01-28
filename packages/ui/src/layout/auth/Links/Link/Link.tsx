import React from 'react';

import LinkComponent from '@repo/ds/components/link/Link';
import Text from '@repo/ds/elements/text/Text';

import type { AuthLink } from '../../interface';

import './Link.scss';

export default function Link({
  title,
  label,
  context = 'neutral',
  ariaLabel,
  clickAction,
}: AuthLink) {
  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    clickAction?.();
  };

  return (
    <div className="link-ui">
      {title && <Text color={`${context}-100`}>{title}</Text>}
      <LinkComponent
        role="button"
        aria-label={ariaLabel ?? label}
        onClick={handleOnClick}
        context={context}
      >
        {label}
      </LinkComponent>
    </div>
  );
}

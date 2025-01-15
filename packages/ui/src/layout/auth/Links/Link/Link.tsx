import React from 'react';

import LinkComponent from '@repo/ds/components/link/Link';
import Text from '@repo/ds/elements/text/Text';

import type { AuthLink } from '../../interface';

import './Link.scss';

export default function Link({
  title,
  label,
  context = 'neutral',
  clickAction,
}: AuthLink) {
  return (
    <div className="link">
      {title && <Text color={`${context}-100`}>{title}</Text>}
      <LinkComponent onClick={clickAction} context={context}>
        {label}
      </LinkComponent>
    </div>
  );
}

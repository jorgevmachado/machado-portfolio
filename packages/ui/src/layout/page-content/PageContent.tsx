import React from 'react';

import Text from '@repo/ds/elements/text/Text';

import './PageContent.scss';

interface PageContentProps {
  title?: string;
  children: React.ReactNode;
}

export default function PageContent({ title, children }: PageContentProps) {
  return (
    <div className="page-content">
      {title && (
        <Text tag="h1" weight="bold" variant="xlarge">
          {title}
        </Text>
      )}
      <div>{children}</div>
    </div>
  );
}

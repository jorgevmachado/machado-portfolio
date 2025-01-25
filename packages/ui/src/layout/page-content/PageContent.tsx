import React from 'react';

import joinClass from '@repo/ds/utils/join-class/joinClass';

import Text from '@repo/ds/elements/text/Text';

import './PageContent.scss';

interface PageContentProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
  className?: string;
  ariaLabelledBy?: string;
  contentClassName?: string;
}

export default function PageContent({
  title,
  children,
  className = '',
  ariaLabelledBy,
  contentClassName = '',
  ...props
}: PageContentProps) {
  return (
    <div
      className={joinClass(['page-content', className])}
      aria-labelledby={ariaLabelledBy}
      {...props}
    >
      {title && (
        <Text tag="h1" weight="bold" variant="xlarge">
          {title}
        </Text>
      )}
      <div className={contentClassName}>{children}</div>
    </div>
  );
}

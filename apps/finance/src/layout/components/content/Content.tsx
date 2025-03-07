import React from 'react';

import './Content.scss';

import Text from '@repo/ds/elements/text/Text';

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}
export default function Content({ title, children }: ContentProps) {
  return (
    <div className="content">
      {title && <Text tag="h1">{title}</Text>}
      {children}
    </div>
  );
}

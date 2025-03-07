import React from 'react';

import Text from '@repo/ds/elements/text/Text';

import Fade from '../../../animations/fade';

import './Content.scss';

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
  withAnimation?: boolean;
}
export default function Content({
  title,
  children,
  withAnimation,
}: ContentProps) {
  const Wrapper = withAnimation ? Fade : React.Fragment;
  return (
      <Wrapper {...(withAnimation && { enter: true })}>
        <div className="content">
          {title && <Text tag="h1">{title}</Text>}
          {children}
        </div>
      </Wrapper>
  );
}

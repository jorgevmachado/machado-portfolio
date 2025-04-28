import React from 'react';

import joinClass from '@repo/ds/utils/join-class/joinClass';
import Text from '@repo/ds/elements/text/Text';

import Fade from '../../../animations/fade';

import './Content.scss';

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
  isSidebarOpen?: boolean;
  withAnimation?: boolean;
}
export default function Content({
  title,
  children,
  isSidebarOpen = true,
  withAnimation,
}: ContentProps) {
  const Wrapper = withAnimation ? Fade : React.Fragment;
  const classNameList = joinClass([
    'content',
    isSidebarOpen ? 'content__sidebar--open' : 'content__sidebar--closed',
  ]);
  return (
    <Wrapper {...(withAnimation && { enter: true })}>
      <div className={classNameList}>
        {title && (
          <Text tag="h1" color="navbar-background">
            {title}
          </Text>
        )}
        {children}
      </div>
    </Wrapper>
  );
}

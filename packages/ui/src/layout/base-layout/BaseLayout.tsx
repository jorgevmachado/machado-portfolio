import React from 'react';

import joinClass from '@repo/ds/utils/join-class/joinClass';

import Fade from '../../animations/fade/Fade';

import './BaseLayout.scss';

interface BlankProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ariaLabel?: string;
  withAnimation?: boolean;
}

export default function BaseLayout({
  children,
  className = '',
  ariaLabel,
  withAnimation = true,
  ...props
}: BlankProps) {
  const Wrapper = withAnimation ? Fade : React.Fragment;

  return (
    <Wrapper {...(withAnimation && { enter: true })}>
      <div
        role="base-layout"
        className={joinClass(['base-layout', className])}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </div>
    </Wrapper>
  );
}

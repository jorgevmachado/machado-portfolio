import React from 'react';

import Fade from 'src/animations/fade/Fade';

import './Blank.scss';

interface BlankProps {
  children: React.ReactNode;
}

export default function Blank({ children }: BlankProps) {
  return (
    <Fade enter={true}>
      <div className="blank">{children}</div>
    </Fade>
  );
}

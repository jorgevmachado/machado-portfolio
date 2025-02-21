import React from 'react';

import './Content.scss';

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}
export default function Content({ title, children }: ContentProps) {
  return (
    <div className="content">
      {title && <h1>{title}</h1>}
      {children}
    </div>
  );
}

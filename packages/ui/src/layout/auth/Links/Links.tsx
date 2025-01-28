import React from 'react';
import type { TContext } from '@repo/ds/utils/colors/interface';

import joinClass from '@repo/ds/utils/join-class/joinClass';

import type { AuthLink } from '../interface';

import Link from './Link';

import './Links.scss';

interface LinksProps {
  context?: TContext;
  className?: string;
  authLinks: Array<AuthLink>;
}

export default function Links({
  context,
  className = '',
  authLinks,
}: LinksProps) {
  if (!authLinks.length) {
    return null;
  }
  return (
    <div className={joinClass(['links', className])}>
      {authLinks
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((link) => (
          <Link
            key={`${link.label}-${link.order}`}
            {...link}
            context={link.context ?? context}
          />
        ))}
    </div>
  );
}

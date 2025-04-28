import React from 'react';
import type { TContext } from '@repo/ds/utils/colors/interface';

import Link from '@repo/ds/components/link/Link';
import Text from '@repo/ds/elements/text/Text';

import './Links.scss';

export type TLink = {
  order: number;
  title?: string;
  label: string;
  context?: TContext;
  ariaLabel?: string;
  onClick: () => void;
};

interface LinksProps {
  links: Array<TLink>;
  context?: TContext;
}

export default function Links({ links, context }: LinksProps) {
  if (!links.length) {
    return null;
  }

  const handleOnClick = (e: React.MouseEvent, link: TLink) => {
    e.preventDefault();
    link?.onClick && link.onClick();
  };

  return (
    <div className="links">
      {links
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((link) => (
          <div key={`${link.label}-${link.order}`} className="links__link">
            {link?.title && (
              <Text color={link?.context && `${link.context}-100`}>
                {link.title}
              </Text>
            )}
            <Link
              role="button"
              aria-label={link.label}
              onClick={(e) => handleOnClick(e, link)}
              context={context}
            >
              {link.label}
            </Link>
          </div>
        ))}
    </div>
  );
}

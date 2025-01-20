import React from 'react';
import type { TContext } from '@repo/ds/utils/colors/interface';

import type { AuthLink } from '../interface';

import Link from './Link';

import './Links.scss';

interface LinksProps {
  context?: TContext;
  signUpLink?: AuthLink;
  signInLink?: AuthLink;
  forgotPasswordLink?: AuthLink;
}

export default function Links({
  context,
  signUpLink,
  signInLink,
  forgotPasswordLink,
}: LinksProps) {
  return (
    <div className="links">
      {signUpLink && (
        <Link {...signUpLink} context={signUpLink.context ?? context} />
      )}
      {signInLink && (
        <Link {...signInLink} context={signInLink.context ?? context} />
      )}
      {forgotPasswordLink && (
        <Link
          {...forgotPasswordLink}
          context={forgotPasswordLink.context ?? context}
        />
      )}
    </div>
  );
}

import React from 'react';

import type { AuthSocial } from '../interface';

import Social from './Social';

import './Socials.scss';

interface SocialsProps {
  authSocials?: Array<AuthSocial | undefined>;
}
export default function Socials({ authSocials = [] }: SocialsProps) {
  const hasSocialAuth = authSocials.length > 0;

  return (
    hasSocialAuth && (
      <div className="socials">
        {authSocials.map((social) => (
          <Social key={social?.platform} auth={social} />
        ))}
      </div>
    )
  );
}

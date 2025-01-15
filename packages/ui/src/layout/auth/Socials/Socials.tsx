import React from 'react';

import Button from '@repo/ds/components/button/Button';

import { AuthSocial } from '../interface';

import './Socials.scss';

interface SocialsProps {
  googleAuth?: AuthSocial;
  facebookAuth?: AuthSocial;
}
export default function Socials({ googleAuth, facebookAuth }: SocialsProps) {
  return (
    <div className="socials">
      {googleAuth && (
        <Button {...googleAuth} fluid icon="google" className="socials--google">
          {googleAuth.label}
        </Button>
      )}
      {facebookAuth && (
        <Button
          {...facebookAuth}
          fluid
          icon="facebook"
          className="socials--facebook"
        >
          {facebookAuth.label}
        </Button>
      )}
    </div>
  );
}

import React from 'react';

import Button from '@repo/ds/components/button/Button';

import { AuthSocial } from '../../interface';

import './Social.scss';

interface SocialProps {
  auth?: AuthSocial;
}

export default function ({ auth }: SocialProps) {
  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    onClick?.(e);
  };
  return (
    auth && (
      <Button
        {...auth}
        fluid
        icon={auth.platform}
        onClick={(e) => handleOnClick(e, auth?.onClick)}
        tabIndex={0}
        aria-label={auth?.ariaLabel ?? auth.label}
        className={`social__${auth.platform}`}
      >
        {auth.label}
      </Button>
    )
  );
}

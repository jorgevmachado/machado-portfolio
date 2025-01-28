import React from 'react';

import Image from '@repo/ds/elements/image/Image';

import { LogoProps } from '../interface';

export default function Logo({ logo }: { logo?: LogoProps }) {
  if (!logo) {
    return null;
  }
  const {
    src,
    alt = 'auth logo',
    title = 'auth logo',
    width = '15rem',
    height = '5rem',
  } = logo;

  return (
    <Image
      fit="contain"
      src={src}
      alt={alt}
      title={title}
      style={{
        width,
        height,
        margin: '0 auto',
      }}
    />
  );
}

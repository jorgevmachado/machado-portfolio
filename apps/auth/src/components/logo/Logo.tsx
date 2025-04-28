import React from 'react';

import Image from '@repo/ds/elements/image/Image';

type LogoProps = {
  src?: string;
  alt?: string;
  title?: string;
  width?: string;
  height?: string;
};

export default function Logo({
  src,
  alt = 'auth logo',
  title = 'auth logo',
  width = '15rem',
  height = '5rem',
}: LogoProps) {
  if (!src) {
    return null;
  }

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

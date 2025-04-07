import React, { useEffect, useMemo, useState } from 'react';

import { initials } from '@repo/services/string/string';

import type { TContext, TSimplySIze } from '../../utils';

import joinClass from '../../utils/join-class';

import { Text } from '../../elements/text';

import './Avatar.scss';

interface AvatarProps {
  readonly src?: string;
  readonly size?: TSimplySIze;
  readonly name: string;
  readonly context?: TContext;
  readonly initialsLength?: number;
  readonly hasNotification?: boolean;
}

export default function Avatar({
  src,
  size = 'medium',
  name,
  context = 'neutral',
  initialsLength = 3,
  hasNotification,
  ...props
}: AvatarProps) {
  const [isImageLoaded, setImageLoaded] = useState<boolean>(false);

  const initialsName = useMemo(() => {
    return initials(name, initialsLength);
  }, [name, initialsLength]);

  const classNameList = joinClass([
    'avatar',
    size && `avatar__size--${size}`,
    context && `avatar__context--${context}`,
    hasNotification && 'avatar__has-notification',
  ]);

  const imageClassNameList = joinClass([
    'avatar__img',
    isImageLoaded && 'avatar__img--loaded',
  ]);

  const onLoadImage = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    setImageLoaded(false);
  }, [src]);

  return (
    <div
      {...props}
      role="img"
      aria-label={src ? name : `Avatar of ${initialsName}`}
      className={classNameList}
    >
      <div className="avatar__wrapper">
        {Boolean(src) && (
          <img
            className={imageClassNameList}
            alt={name}
            src={src}
            onLoad={onLoadImage}
          />
        )}
        {!isImageLoaded && (
          <Text tag="span" color="neutral-90">
            {initialsName}
          </Text>
        )}
      </div>
    </div>
  );
}

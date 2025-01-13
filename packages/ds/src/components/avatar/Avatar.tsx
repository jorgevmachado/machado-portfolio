import React, { useState } from 'react';

import type { TContext } from '../../utils/colors';
import type { TSimplySIze } from '../../utils/sizes';

import joinClass from '../../utils/join-class';

import Text from '../../elements/text';

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

  const classNameList = joinClass([
    'avatar',
    `avatar__size--${size}`,
    `avatar__context--${context}`,
    `${hasNotification ? 'avatar__has-notification' : ''}`,
  ]);

  const imageClassNameList = joinClass([
    'avatar__img',
    `${isImageLoaded ? 'avatar__img--loaded' : ''}`,
  ]);

  const onLoadImage = () => {
    setImageLoaded(true);
  };

  const getNameInitials = (name: string, length: number): string => {
    if (length <= 0) {
      length = 1;
    }
    const initials = name
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .replace(/\s{2,}/, ' ')
      .toUpperCase()
      .split(' ');

    const filteredInitials = initials.filter((i) => i.length);

    if (filteredInitials.length) {
      return format(filteredInitials, length);
    }

    return format(initials, length);
  };

  const format = (initialLetters: Array<string>, length: number) => {
    return initialLetters
      .map((word) => word[0])
      .slice(0, length)
      .join('');
  };

  return (
    <div className={classNameList} {...props}>
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
            {getNameInitials(name, initialsLength)}
          </Text>
        )}
      </div>
    </div>
  );
}

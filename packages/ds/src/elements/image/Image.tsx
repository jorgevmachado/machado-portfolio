import React, { useCallback, useEffect, useState } from 'react';

import joinClass from '../../utils/join-class';

import Icon from '../icon';

import './Image.scss';

interface ImageProps extends React.ImgHTMLAttributes<Element> {
  readonly fit?: 'cover' | 'contain';
  readonly lazyLoad?: boolean;
  readonly fallback?: boolean;
}

export default function Image({
  alt,
  fit,
  onError: onErrorCallback,
  loading,
  lazyLoad,
  fallback,
  className,
  ...props
}: ImageProps) {
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if (!props.src) {
      setIsInvalid(true);
    }
  }, [props.src]);

  const onError = useCallback<React.ReactEventHandler<HTMLImageElement>>(
    (event) => {
      setIsInvalid(true);
      return onErrorCallback?.(event);
    },
    [setIsInvalid, onErrorCallback],
  );

  const classNameList = joinClass([
    'image',
    `${fit ? `image__fit-${fit}` : ''}`,
    className,
  ]);

  if (isInvalid && fallback) {
    return (
      <div className="image__fallback" title={alt}>
        <Icon icon="camera" className="image__fallback--icon" />
      </div>
    );
  }

  return (
    <img
      {...props}
      alt={alt}
      onError={onError}
      loading={loading ?? (lazyLoad ? 'lazy' : undefined)}
      className={classNameList}
    />
  );
}

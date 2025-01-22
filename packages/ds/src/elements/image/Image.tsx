import React, { useCallback, useEffect, useState } from 'react';

import joinClass from '../../utils/join-class';

import Icon from '../icon';

import './Image.scss';

interface ImageProps extends React.ImgHTMLAttributes<Element> {
  readonly fit?: 'cover' | 'contain';
  readonly lazyLoad?: boolean;
  readonly fallback?: React.ReactNode;
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
  const [isInvalid, setIsInvalid] = useState(!props.src);

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
    fit && `image__fit-${fit}`,
    className,
  ]);

  if (isInvalid && fallback) {
    return (
      <div
        className="image__fallback"
        title={alt}
        aria-label={alt ?? 'Image failed to load'}
      >
        {typeof fallback === 'boolean' ? (
          <Icon icon="camera" className="image__fallback--icon" />
        ) : (
          fallback
        )}
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

import React, { useMemo } from 'react';

import type { TContext } from '../../utils';

import joinClass from '../../utils/join-class';

import { Icon, Tooltip } from '../../elements';

import './Rating.scss';

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  length?: number;
  rating?: number;
  context?: TContext;
  halfStar?: boolean;
  ratingInfo?: boolean;
  ratingCount?: number;
  roundRating?: boolean;
  ratingInfoText?: string;
}

export default function Rating({
  length = 5,
  rating = 0,
  context = 'neutral',
  halfStar,
  ratingInfo,
  ratingCount,
  roundRating,
  ratingInfoText = 'Service Satisfaction',
  ...props
}: RatingProps) {
  const value = Math.round(rating);

  const currentRating = roundRating ? Math.round(rating) : rating;

  const getStar = (value: number, index: number) => {
    if (halfStar && rating > index - 1 && rating < index) {
      return 'star-half';
    }

    return value >= index ? 'star-filled' : 'star';
  };

  const stars = useMemo(() => {
    const starsArray: Array<React.ReactNode> = [];
    for (let i = 1; i <= length; i++) {
      starsArray.push(
        <Icon
          key={`star-${i}`}
          icon={getStar(value, i)}
          size="2em"
          color={`${context}-80`}
        />,
      );
    }
    return starsArray;
  }, [length, rating, context]);

  const renderStars = () => stars;

  const classNameList = joinClass(['rating', `rating__context--${context}`]);

  return (
    <div
      {...props}
      className={classNameList}
      aria-label={`Rated ${currentRating} out of ${length} stars. ${
        ratingCount ? `${ratingCount} total ratings.` : ''
      }`}
    >
      <span role="img" aria-label={`Rated ${value} out of ${length} stars`}>
        {renderStars()}
      </span>
      <span className="rating__rate">({currentRating})</span>
      <div className="rating__informations">
        {ratingCount && (
          <p className="rating__informations--count">{ratingCount} ratings</p>
        )}
        {ratingCount && ratingInfo && (
          <Tooltip content={ratingInfoText} align="top">
            <Icon icon="info" className="rating__informations--icon" />
          </Tooltip>
        )}
      </div>
    </div>
  );
}

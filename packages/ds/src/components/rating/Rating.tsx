import React from 'react';

import type { TContext } from '../../utils/colors';

import joinClass from '../../utils/join-class';

import Icon from '../../elements/icon';
import Tooltip from '../../elements/tooltip';

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
    const currentValue = halfStar ? rating : value;
    const previousIndex = index - 1;

    if (currentValue >= index) {
      return 'star-filled';
    }

    if (currentValue > previousIndex && currentValue < index) {
      return 'star-half';
    }

    return 'star';
  };

  const renderStars = () => {
    const stars: Array<React.ReactNode> = [];

    for (let i = 1; i <= length; i++) {
      stars.push(
        <Icon
          key={`star-${i}`}
          icon={getStar(value, i)}
          size="2em"
          color={`${context}-80`}
        />,
      );
    }

    return stars;
  };

  const classNameList = joinClass(['rating', `rating__context--${context}`]);

  return (
    <div {...props} className={classNameList}>
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

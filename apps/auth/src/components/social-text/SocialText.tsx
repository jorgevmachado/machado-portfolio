import React from 'react';

import Text from '@repo/ds/elements/text/Text';

import './SocialText.scss';

interface SocialTextProps {
  text?: string;
  hasSocialAuth: boolean;
}

export default function SocialText({ text, hasSocialAuth }: SocialTextProps) {
  if (!text || !hasSocialAuth) {
    return null;
  }

  return (
    <div className="social-text">
      <hr className="social-text__line" aria-hidden={true} />
      <Text className="social-text__text">{text}</Text>
      <hr className="social-text__line" aria-hidden={true} />
    </div>
  );
}

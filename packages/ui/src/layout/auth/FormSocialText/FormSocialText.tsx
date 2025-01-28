import React from 'react';

import Text from '@repo/ds/elements/text/Text';

import './FormSocialText.scss';

interface FormSocialTextProps {
  text?: string;
  hasSocialAuth: boolean;
}

export default function FormSocialText({
  text,
  hasSocialAuth,
}: FormSocialTextProps) {
  if (!text || !hasSocialAuth) {
    return null;
  }

  return (
    <div className="form-social-text">
      <hr className="form-social-text__line" aria-hidden={true} />
      <Text className="form-social-text__text">{text}</Text>
      <hr className="form-social-text__line" aria-hidden={true} />
    </div>
  );
}

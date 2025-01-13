import React from 'react';

import joinClass from '../../utils/join-class';

import Text from '../../elements/text';

import './Feedback.scss';

interface FeedbackProps {
  context: 'error' | 'success' | 'attention';
  children?: React.ReactNode;
  className?: string;
}

export default function Feedback({
  context,
  children,
  className,
}: FeedbackProps) {
  const classNameList = joinClass(['feedback', `${className ?? className}`]);
  return (
    <Text color={`${context}-80`} variant="regular" className={classNameList}>
      {children}
    </Text>
  );
}

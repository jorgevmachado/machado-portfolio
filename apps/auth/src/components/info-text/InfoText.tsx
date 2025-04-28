import React from 'react';

import Text from '@repo/ds/elements/text/Text';
import joinClass from '@repo/ds/utils/join-class/joinClass';

import './InfoText.scss';

interface InfoTextProps {
    title?: string;
    description?: string;
}

export default function InfoText({ title, description }: InfoTextProps) {
    const isDescriptionLarge = (description?.length ?? 0) > 56;
    if (!title && !description) {
        return null;
    }
    return (
        <>
            {title && (
                <Text tag="h1" weight="bold" variant="xlarge">
                    {title}
                </Text>
            )}
            {description && (
                <Text
                    tag="p"
                    variant="regular"
                    className={joinClass([
                        'info-text__description',
                        isDescriptionLarge && 'info-text__description--large',
                    ])}
                >
                    {description}
                </Text>
            )}
        </>
    );
}

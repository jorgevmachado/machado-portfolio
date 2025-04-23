import React from 'react';

import Button from '@repo/ds/components/button/Button';

import './Socials.scss';
import {SocialText} from "../index";

type TSocialPlatform = 'google' | 'facebook' | 'github';

export type TSocial = Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  label: string;
  platform: TSocialPlatform;
};

export type SocialsProps = {
  socials: Array<TSocial>;
  socialText: string;
};

const implementedSocialMedias: Array<TSocialPlatform> = [];

export default function Socials({ socials = [], socialText }: SocialsProps) {
  const currentSocialMedias =  socials.filter((social) => implementedSocialMedias.includes(social.platform));

  const hasSocial = currentSocialMedias.length > 0;

  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    onClick && onClick(e);
  };

  return (
    hasSocial && (
        <>
          <div className="socials">
            {currentSocialMedias.map((social) => (
                <Button
                    key={social.platform}
                    fluid
                    icon={social.platform}
                    onClick={(e) => handleOnClick(e, social?.onClick)}
                    tabIndex={0}
                    aria-label={social.label}
                    className={`social__button--${social.platform}`}
                >
                  {social.label}
                </Button>
            ))}
          </div>
          <SocialText text={socialText} hasSocialAuth />
        </>
    )
  );
}

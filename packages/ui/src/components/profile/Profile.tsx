import React from 'react';

import type { TContext } from '@repo/ds/utils/colors';

import Avatar from '@repo/ds/components/avatar/Avatar';
import Link from '@repo/ds/components/link/Link';
import Text from '@repo/ds/elements/text/Text';
import joinClass from '@repo/ds/utils/join-class/joinClass';

import type { Menu } from '../../utils';

import './Profile.scss';

interface ProfileProps {
  name?: string;
  email?: string;
  picture?: string;
  context?: TContext;
  children: React.ReactNode;
  className?: string;
  profileMenu?: Menu['items'][number];
}

export default function Profile({
  name,
  email,
  picture,
  context = 'neutral',
  children,
  className = '',
  profileMenu,
}: ProfileProps) {
  const classNameList = joinClass([
    'profile',
    context && `profile__context--${context}`,
    className,
  ]);

  return (
    <div role="region" className={classNameList} aria-label="Profile Section">
      {children}
      <div className="profile__info">
        {(name || picture) && (
          <Avatar
            src={picture}
            size="large"
            name={name ?? 'username'}
            initialsLength={2}
            aria-label={`Avatar de ${name}`}
          />
        )}
        <div>
          {name && (
            <Text
              color="white"
              variant="medium"
              weight="bold"
              className="profile__info--name"
            >
              {name}
            </Text>
          )}
          {name && (
            <Text
              color="white"
              variant="regular"
              className="profile__info--email"
            >
              <span>{email}</span>
            </Text>
          )}
          {profileMenu && (
            <Link
              icon="arrow-right"
              onClick={profileMenu.onRedirect}
              className="profile__info--link"
              aria-label={`Menu de perfil: ${profileMenu.label}`}
              iconPosition="right"
            >
              {profileMenu.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';

import Image from '@repo/ds/elements/image/Image';
import Text from '@repo/ds/elements/text/Text';

import { AuthProps } from './interface';
import Links from './Links';
import Socials from './Socials';

import joinClass from '@repo/ds/utils/join-class/joinClass';

import './Auth.scss';
import Form from './Form';

export default function Auth({
  type = 'blank',
  logo,
  title,
  children,
  onSubmit,
  context = 'primary',
  googleAuth,
  signUpLink,
  signInLink,
  description,
  facebookAuth,
  forgotPasswordLink,
  ...props
}: AuthProps) {
  const hasSocialAuth = googleAuth || facebookAuth;
  const hasLink = signInLink || signUpLink || forgotPasswordLink;
  const classNameList = joinClass(['auth', `${props.className ?? ''}`]);

  return (
    <div {...props} className={classNameList}>
      {logo && (
        <Image
          src={logo.src}
          alt={logo.alt ?? 'auth logo'}
          title={logo.title ?? 'auth logo'}
          style={{
            width: logo.width ?? '15rem',
            height: logo.height ?? '5rem',
          }}
        />
      )}
      {title && (
        <Text tag="h1" weight="bold" variant="xlarge" className="auth__title">
          {title}
        </Text>
      )}
      {description && (
        <Text tag="h2" variant="regular" className="auth__description">
          {description}
        </Text>
      )}
      {hasSocialAuth && (
        <Socials googleAuth={googleAuth} facebookAuth={facebookAuth} />
      )}

      {type === 'blank' ? (
        children
      ) : (
        <Form type={type} context={context} onSubmit={onSubmit} />
      )}

      {hasLink && (
        <Links
          signUpLink={signUpLink}
          signInLink={signInLink}
          forgotPasswordLink={forgotPasswordLink}
          context={context}
        />
      )}
    </div>
  );
}

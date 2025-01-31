import React from 'react';

import joinClass from '@repo/ds/utils/join-class/joinClass';

import { Form } from '../../components';

import type {AuthProps} from './interface';
import InfoText from './InfoText';
import Links from './Links';
import Logo from './Logo';
import Socials from './Socials';
import FormSocialText from './FormSocialText';

import './Auth.scss';

export default function Auth({
  type = 'blank',
  logo,
  title,
  children,
  onSubmit,
  context = 'primary',
  loading,
  className = '',
  authLinks = [],
  description,
  authSocials = [],
  formSocialText = 'Or register with your email',
  ...props
}: AuthProps) {
  const hasSocialAuth = authSocials.length > 0;
  const classNameList = joinClass(['auth', className]);

  return (
    <div {...props} className={classNameList}>
      <Logo logo={logo} />

      <InfoText title={title} description={description} />

      <Socials authSocials={authSocials} />

      <FormSocialText text={formSocialText} hasSocialAuth={hasSocialAuth} />

      <Form type={type} context={context} onSubmit={onSubmit} loading={loading}>
        {children}
      </Form>

      <Links context={context} className="auth__links" authLinks={authLinks} />
    </div>
  );
}

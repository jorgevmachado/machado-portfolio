'use client';
import { useActionState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Auth from '@repo/ui/layout/auth/Auth';
import type { AuthForm } from '@repo/ui/components/form/interface';

import { signUp } from '../../../actions';

import './SignUp.scss';

export default function SignUp() {
  const [state, action, pending] = useActionState(signUp, undefined);

  const router = useRouter();

  useEffect(() => {
    if (!pending && state?.message) {
      alert(state.message);
    }
    if (state?.valid) {
      router.push('/sign-in');
    }
  }, [state]);

  const handleSubmit = (authForm: AuthForm) => {
    if (authForm.formData) {
      action(authForm.formData);
    }
  };

  return (
    <Auth
      type="signUp"
      logo={{ src: '/logo/logo.svg', width: '15rem', height: '15rem' }}
      title="Sign Up"
      onSubmit={handleSubmit}
      context="primary"
      loading={pending}
      className="sign-up"
      authLinks={[
        {
          order: 1,
          title: 'Already have an account ?',
          label: 'Sign in here',
          clickAction: () => router.push('/sign-in'),
        },
      ]}
      description="By continuing, you affirm that you are over 18 years old and allow the sharing of your data in interactions with the platform."
    />
  );
}

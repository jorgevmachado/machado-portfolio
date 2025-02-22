'use client';
import { startTransition, useActionState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Auth from '@repo/ui/layout/auth/Auth';
import type { AuthForm } from '@repo/ui/components/form/interface';

import { signIn } from '../../../actions';

import './SignIn.scss';

export default function SignIn() {
  const [state, action, pending] = useActionState(signIn, undefined);

  const router = useRouter();

  useEffect(() => {
    if (!pending && state?.message) {
      alert(state.message);
    }
    if (state?.valid) {
      router.push('/');
    }
  }, [state, pending]);

  const handleSubmit = (authForm: AuthForm) => {
    if (authForm.formData) {
      startTransition(() => {
        action(authForm.formData as FormData);
      });
    }
  };

  return (
    <Auth
      type="signIn"
      logo={{ src: '/logo/logo.svg', width: '15rem', height: '15rem' }}
      title="Sign in"
      onSubmit={handleSubmit}
      context="primary"
      loading={pending}
      className="sign-in"
      authLinks={[
        {
          order: 1,
          title: 'Dont have an account ?',
          label: 'Register here',
          clickAction: () => router.push('/sign-up'),
        },
        {
          order: 2,
          label: 'I forgot my password',
          clickAction: () => router.push('/forgot-password'),
        },
      ]}
      description="By continuing, you affirm that you are over 18 years old and allow the sharing of your data in interactions with the platform."
    />
  );
}

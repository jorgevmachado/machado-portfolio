'use client';
import { useActionState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Auth from '@repo/ui/layout/auth/Auth';
import type { AuthForm } from '@repo/ui/layout/auth/Form/interface';

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
  }, [state]);

  const handleSubmit = (authForm: AuthForm) => {
    if (authForm.formData) {
      action(authForm.formData);
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
      signUpLink={{
        title: 'Dont have an account ?',
        label: 'Register here',
        clickAction: () => router.push('/sign-up'),
      }}
      description="By continuing, you affirm that you are over 18 years old and allow the sharing of your data in interactions with the platform."
      forgotPasswordLink={{
        label: 'I forgot my password',
        clickAction: () => router.push('/forgot-password'),
      }}
    />
  );
}

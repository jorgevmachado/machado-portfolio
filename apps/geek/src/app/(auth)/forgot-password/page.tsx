'use client';
import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Auth from '@repo/ui/layout/auth/Auth';

import type { AuthForm } from '@repo/ui/components/form/interface';

import { forgotPassword } from '../../../actions';

import './ForgotPassword.scss';

export default function ForgotPassword() {
  const [state, action, pending] = useActionState(forgotPassword, undefined);

  const router = useRouter();

  useEffect(() => {
    if (!pending && state?.valid) {
      alert(
        'In bookshelves you will receive an email with further instructions!',
      );
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
      type="forgotPassword"
      logo={{ src: '/logo/logo.svg', width: '15rem', height: '15rem' }}
      title="Forgot Password"
      context="primary"
      className="forgot-password"
      onSubmit={handleSubmit}
      description="Enter your registered email to reset your password"
      authLinks={[
        {
          order: 1,
          label: 'Back to login',
          clickAction: () => router.push('/sign-in'),
        },
      ]}
    />
  );
}

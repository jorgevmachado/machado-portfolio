'use client';
import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { emailValidator } from '@repo/services/validator/contact/contact';

import Button from '@repo/ds/components/button/Button';

import Auth from '@repo/ui/layout/auth/Auth';
import Input from '@repo/ui/components/input/Input';

import { forgotPassword } from '../../actions';

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

  return (
    <Auth
      logo={{ src: '/logo/logo.svg', width: '15rem', height: '15rem' }}
      title="Forgot Password"
      context="primary"
      className="forgot-password"
      description="Enter your registered email to reset your password"
      signInLink={{
        label: 'Back to login',
        clickAction: () => router.push('/sign-in'),
      }}
    >
      <form action={action} className="forgot-password__form">
        <div>
          <Input
            id="email"
            name="email"
            label="E-mail"
            context="primary"
            validate={emailValidator}
            placeholder="Enter your signUp E-mail"
            reloadValidate={state?.errors?.email}
          />
        </div>

        <Button type="submit" fluid context="primary" loading={pending}>
          Send
        </Button>
      </form>
    </Auth>
  );
}

'use client';
import { useActionState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Button from '@repo/ds/components/button/Button';
import validator from '@repo/services/validator/validator';

import Auth from '@repo/ui/layout/auth/Auth';
import Input from '@repo/ui/components/input/Input';

import { signIn } from '../../actions';

import './SignIn.scss';

export default function SignIn() {
  const [state, action, pending] = useActionState(signIn, undefined);

  const router = useRouter();

  useEffect(() => {
    if (!pending && state?.valid) {
      alert('You have successfully logged in!');
    }
  }, [state]);

  return (
    <Auth
      logo={{ src: '/logo/logo.svg', width: '15rem', height: '15rem' }}
      title="Sign in"
      context="primary"
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
    >
      <form action={action} className="sign-in__form">
        <div>
          <Input
            id="email"
            name="email"
            label="E-mail"
            context="primary"
            validate={validator.email}
            placeholder="Enter your signUp E-mail"
          />
        </div>

        <div>
          <Input
            id="password"
            type="password"
            name="password"
            label="Password"
            context="primary"
            validate={validator.password}
            placeholder="Enter your signUp Password"
          />
        </div>
        <Button type="submit" fluid context="primary" loading={pending}>
          Sign In
        </Button>
      </form>
    </Auth>
  );
}

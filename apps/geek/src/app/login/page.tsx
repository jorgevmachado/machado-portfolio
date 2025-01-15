'use client';
import { useActionState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Button from '@repo/ds/components/button/Button';
import validator from '@repo/services/validator/validator';

import Auth from '@repo/ui/layout/auth/Auth';
import Input from '@repo/ui/components/input/Input';

import { signIn } from '../../actions';

import './Login.scss';

export default function Login() {
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
      className="login"
      signUpLink={{
        title: 'Dont have an account ?',
        label: 'Register here',
        clickAction: () => router.push('/signup'),
      }}
      description="By continuing, you affirm that you are over 18 years old and allow the sharing of your data in interactions with the platform."
      forgotPasswordLink={{
        label: 'I forgot my password',
        clickAction: () => router.push('/forgot-password'),
      }}
    >
      <form action={action} className="login__form">
        <div>
          <Input
            id="email"
            name="email"
            label="E-mail"
            context="primary"
            validate={validator.email}
            placeholder="Email"
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
            placeholder="Password"
          />
        </div>
        <Button type="submit" fluid context="primary" loading={pending}>
          Sign Up
        </Button>
      </form>
    </Auth>
  );
}

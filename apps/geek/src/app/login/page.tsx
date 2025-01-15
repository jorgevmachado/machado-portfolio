'use client';
import { useActionState } from 'react';

import { signup } from '../../actions';

import Input from '@repo/ui/components/input/Input';

import validator from '@repo/services/validator/validator';

export default function Login() {
  const [state, action, pending] = useActionState(signup, undefined);
  console.log('state', state);
  console.log('action', action);
  console.log('pending', pending);
  return (
    <form action={action}>
      <div>
        <Input
          id="email"
          validate={validator.email}
          label="E-mail"
          context="primary"
          name="email"
          placeholder="Email"
        />
      </div>

      <div>
        <Input
          id="password"
          validate={validator.password}
          label="password"
          context="primary"
          name="password"
          placeholder="Password"
        />
      </div>
      <button disabled={pending} type="submit">
        Sign Up
      </button>
    </form>
  );
}

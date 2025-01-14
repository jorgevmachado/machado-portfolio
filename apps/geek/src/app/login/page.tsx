'use client';
import { useActionState } from 'react';

import { signup } from '../../actions';

export default function Login() {
  const [state, action, pending] = useActionState(signup, undefined);
  console.log('state', state);
  return (
    <form action={action}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>

      <button disabled={pending} type="submit">
        Sign Up
      </button>
    </form>
  );
}

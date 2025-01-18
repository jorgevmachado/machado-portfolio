'use client';
import { useActionState, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import {
  confirmPasswordValidator,
  passwordValidator,
} from '@repo/services/validator/password/password';

import Button from '@repo/ds/components/button/Button';

import Input from '@repo/ui/components/input/Input';

import { resetPassword } from '../../actions';

import './ResetPassword.scss';

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [state, action, pending] = useActionState(resetPassword, {
    valid: false,
    fields: {
      token,
    },
  });
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (state?.message) {
      alert(state.message);
    }
  }, [state]);

  return (
    <div className="reset-password">
      <form action={action} className="reset-password__form">
        <div>
          <Input
            id="password"
            type="password"
            name="password"
            label="Password"
            context="primary"
            validate={passwordValidator}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your new Password"
            reloadValidate={state?.errors?.password}
          />
        </div>
        <div>
          <Input
            id="confirm-password"
            type="password"
            name="passwordConfirmation"
            label="Confirm Password"
            context="primary"
            validate={(value) => confirmPasswordValidator(value, password)}
            placeholder="Confirm Password"
            reloadValidate={state?.errors?.passwordConfirmation}
          />
        </div>
        <Button type="submit" fluid context="primary" loading={pending}>
          Send
        </Button>
      </form>
    </div>
  );
}

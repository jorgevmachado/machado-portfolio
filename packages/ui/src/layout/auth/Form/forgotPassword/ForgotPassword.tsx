import React from 'react';

import validator from '@repo/services/validator/validator';

import Button from '@repo/ds/components/button/Button';
import type { TContext } from '@repo/ds/utils/colors/interface';

import Input from '../../../../components/input/Input';

import './ForgotPassword.scss';

interface ForgotPasswordFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  context: TContext;
  buttonLabel?: string;
}
export default function ForgotPasswordForm({
  context,
  buttonLabel,
  ...props
}: ForgotPasswordFormProps) {
  return (
    <form {...props} className="form">
      <div className="form__password">
        <Input
          id="password"
          type="password"
          validate={validator.password}
          label="password"
          context={context}
          name="password"
          placeholder="Password"
        />
      </div>
      <div className="form__button">
        <Button type="submit" fluid context={context}>
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
}

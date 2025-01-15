import React from 'react';

import validator from '@repo/services/validator/validator';

import Button from '@repo/ds/components/button/Button';
import type { TContext } from '@repo/ds/utils/colors/interface';

import Input from '../../../../components/input/Input';

import './SignUp.scss';

interface SignUpFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  context: TContext;
  buttonLabel?: string;
}
export default function SignUpForm({
  context,
  buttonLabel,
  ...props
}: SignUpFormProps) {
  return (
    <form {...props} className="form">
      <div className="form__cpf">
        <Input
          id="cpf"
          type="text"
          validate={validator.cpf}
          label="CPF"
          context={context}
          name="cpf"
          placeholder="Enter your CPF"
        />
      </div>
      <div className="form__name">
        <Input
          id="name"
          type="text"
          validate={validator.name}
          label="Name"
          context={context}
          name="name"
          placeholder="Enter your Fullname"
        />
      </div>
      <div className="form__whatsup">
        <Input
          id="whatsup"
          type="text"
          validate={validator.mobile}
          label="WhatsUp"
          context={context}
          name="whatsup"
          placeholder="Enter your WhatsUp"
        />
      </div>
      <div className="form__email">
        <Input
          id="email"
          type="email"
          validate={validator.email}
          label="E-mail"
          context={context}
          name="email"
          placeholder="Email"
        />
      </div>
      <div className="form__date-of-birth">
        <Input
          id="date-of-birth"
          type="text"
          validate={validator.name}
          label="Date of birth"
          context={context}
          name="date-of-birth"
          placeholder="Enter your date of birth"
        />
      </div>
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
      <div className="form__confirm-password">
        <Input
          id="confirm-password"
          type="password"
          validate={validator.password}
          label="Password confirmation"
          context={context}
          name="password"
          placeholder="Confirm your password"
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

'use client';
import { useActionState, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import formatter from '@repo/services/formatter/formatter';
import validator from '@repo/services/validator/validator';

import { EGender } from '@repo/business/api/nest/enum';

import Button from '@repo/ds/components/button/Button';

import Auth from '@repo/ui/layout/auth/Auth';
import Input from '@repo/ui/components/input/Input';
import RadioGroup from '@repo/ds/components/radio-group/RadioGroup';

import { signUp } from '../../actions';

import DatePicker from '../../components/date-picker/DatePicker';

import './SignUp.scss';

export default function SignUp() {
  const [state, action, pending] = useActionState(signUp, undefined);
  const [gender, setGender] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    if (!pending && state?.valid) {
      alert('You have successfully logged in!');
    }
  }, [state]);

  return (
    <Auth
      logo={{ src: '/logo/logo.svg', width: '15rem', height: '15rem' }}
      title="Sign Up"
      context="primary"
      className="sign-up"
      signInLink={{
        title: 'Already have an account ?',
        label: 'Sign in here',
        clickAction: () => router.push('/sign-in'),
      }}
      description="By continuing, you affirm that you are over 18 years old and allow the sharing of your data in interactions with the platform."
    >
      <form action={action} className="sign-up__form">
        <div>
          <Input
            id="cpf"
            type="cpf"
            name="cpf"
            label="CPF"
            context="primary"
            validate={validator.cpf}
            formatter={formatter.maskCpf}
            placeholder="Enter your CPF"
            reloadValidate={state?.errors?.cpf}
          />
        </div>
        <div>
          <Input
            id="name"
            name="name"
            label="Name"
            context="primary"
            validate={validator.name}
            placeholder="Enter your Fullname"
            reloadValidate={state?.errors?.name}
          />
        </div>
        <div className="sign-up__form--radio-group">
          <RadioGroup
            id="gender"
            name="gender"
            label="Gender"
            options={[
              {
                label: 'Male',
                value: EGender.MALE,
              },
              {
                label: 'Female',
                value: EGender.FEMALE,
              },
            ]}
            context="primary"
            appearance="standard"
            modelValue={gender}
            onClick={(event) => event.preventDefault()}
            onActionClick={(value) => setGender(value as EGender)}
            requiredMessage={
              state && !state?.errors?.gender?.valid
                ? state?.errors?.gender?.message
                : ''
            }
          />
        </div>
        <div>
          <Input
            id="email"
            name="email"
            label="E-mail"
            context="primary"
            validate={validator.email}
            placeholder="Enter your best E-mail"
            reloadValidate={state?.errors?.email}
          />
        </div>
        <div>
          <Input
            id="whatsup"
            name="whatsup"
            label="WhatsUp"
            context="primary"
            validate={validator.mobile}
            formatter={formatter.maskMobile}
            placeholder="Enter your WhatsUp"
            reloadValidate={state?.errors?.whatsup}
          />
        </div>
        <div>
          <DatePicker
            id="dateOfBirth"
            name="dateOfBirth"
            label="Date of birth"
            minAge={18}
            validate={validator.dateOfBirth}
            placeholder="Enter your date of birth"
            reloadValidate={state?.errors?.dateOfBirth}
          />
        </div>
        <div>
          <Input
            id="password"
            type="password"
            value={password}
            name="password"
            label="Password"
            context="primary"
            validate={validator.password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
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
            validate={(value) => validator.confirmPassword(value, password)}
            placeholder="Confirm Password"
            reloadValidate={state?.errors?.passwordConfirmation}
          />
        </div>
        <Button type="submit" fluid context="primary" loading={pending}>
          Sign Up
        </Button>
      </form>
    </Auth>
  );
}

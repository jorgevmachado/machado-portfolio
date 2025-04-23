'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import type {
  ValidatorMessage,
  ValidatorParams,
} from '@repo/services/validator/interface';
import { emailValidator } from '@repo/services/validator/contact/contact';
import { passwordValidator } from '@repo/services/validator/password/password';
import { isBrowser } from '@repo/services/window/window';

import Input from '@repo/ds/components/input/Input';
import Button from '@repo/ds/components/button/Button';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import { InfoText, Links, Logo, Socials } from '../../components';

import type { TSocial } from '../../components/socials/Socials';
import type { TLink } from '../../components/links/Links';

import {
  authService,
  generateUrl,
  getAccessTokenName,
  setAccessToken,
} from '../../shared';

import './Signin.scss';

type FormDataError = ValidatorMessage & {
  validator: (validatorParams: ValidatorParams) => ValidatorMessage;
};

type SignInFormDataError = {
  email: FormDataError;
  password: FormDataError;
};

type SignInFormDataFields = {
  email: string;
  password: string;
};

type SignInFormData = {
  valid: boolean;
  fields: SignInFormDataFields;
  errors: SignInFormDataError;
  message?: string;
  formData?: FormData;
};

const DefaultFormSignInFormData: SignInFormData = {
  valid: true,
  fields: {
    email: '',
    password: '',
  },
  errors: {
    email: {
      valid: true,
      message: '',
      validator: emailValidator,
    },
    password: {
      valid: true,
      message: '',
      validator: passwordValidator,
    },
  },
};

export default function SignIn() {
  const { addAlert } = useAlert();
  const router = useRouter();
  const searchParams = useSearchParams();
  const env = searchParams.get('env') ?? undefined;
  const source = searchParams.get('source') ?? undefined;
  const redirectTo = searchParams.get('redirectTo') ?? undefined;

  const title = 'Sign in';
  const logoSrc =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHN5dygQnJFirBww40JLAsLuZHF0kOdBrzLw&s';
  const description =
    'By continuing, you affirm that you are over 18 years old and allow the sharing of your data in interactions with the platform.';
  const socialText = 'Or enter your email';

  const redirectToPage = (url: string) => {
    const currentUrl = generateUrl({
      env,
      source,
      redirectTo,
      destination: url,
    }).toString();
    if (isBrowser()) {
      router.push(currentUrl);
      return;
    }
    window.open(currentUrl, '_self');
  };

  const authLinks: Array<TLink> = [
    {
      order: 3,
      label: 'I forgot my password',
      context: 'primary',
      onClick: () => redirectToPage('/forgot-password'),
    },
    {
      order: 1,
      title: 'Dont have an account ?',
      label: 'Register here',
      context: 'primary',
      onClick: () => redirectToPage('/sign-up'),
    },
  ];

  const socials: Array<TSocial> = [
    {
      label: 'Sign in with GitHub',
      onClick: () => redirectToPage('/sign-in?type=github'),
      platform: 'github',
    },
    {
      label: 'Sign in with Google',
      onClick: () => redirectToPage('/sign-in?type=google'),
      platform: 'google',
    },
    {
      label: 'Sign in with Facebook',
      onClick: () => redirectToPage('/sign-in?type=facebook'),
      platform: 'facebook',
    },
  ];

  const [signInFormData, setSignInFormData] = useState<SignInFormData>(
    DefaultFormSignInFormData,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const signInService = async () => {
    if (!signInFormData.valid) {
      return;
    }
    const { email = '', password = '' } = signInFormData.fields;
    setLoading(true);
    authService
      .signIn({ email, password })
      .then((response) => {
        const key = getAccessTokenName(source ?? '');
        setAccessToken(response, key);
        addAlert({ type: 'success', message: 'Authenticated successfully!' });
        isBrowser()
          ? window.open(redirectTo, '_self')
          : router.push(redirectTo ?? '/');
      })
      .catch((error) => {
        const message =
          error?.statusCode !== 500 && error?.message
            ? error.message
            : 'Unable to authenticate at this time, please try again later';

        addAlert({ type: 'error', message });
      });
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formValidate();
    handleAuthFormData();
    await signInService();
  };
  const handleAuthFormData = () => {
    const formData = new FormData();
    Object.entries(signInFormData.fields).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    setSignInFormData((prev) => ({
      ...prev,
      formData,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInFormData((prev) => ({
      ...prev,
      fields: { ...prev.fields, [name]: value },
    }));
  };

  const inputValidate = (name: string) => {
    const value = signInFormData.fields[name as keyof SignInFormDataFields];
    const formDataErrorField =
      signInFormData.errors[name as keyof SignInFormDataError];
    const validate = formDataErrorField.validator({ value: value });
    return {
      ...formDataErrorField,
      ...validate,
    };
  };

  const handleInputValidate = (name: string) => {
    const validate = inputValidate(name);
    setSignInFormData((prev) => ({
      ...prev,
      errors: { ...prev.errors, [name]: validate },
    }));
  };

  const formValidate = () => {
    const formDataState = { ...signInFormData };
    const messages = [];
    const emailValidator = inputValidate('email');
    if (!emailValidator.valid) {
      messages.push(`email: ${emailValidator.message}`);
    }
    const passwordValidator = inputValidate('password');
    if (!passwordValidator.valid) {
      messages.push(`password: ${passwordValidator.message}`);
    }
    if (messages.length > 0) {
      formDataState.valid = false;
      formDataState.message = messages
        .map((message) => `   ${message}`)
        .join('\n');
      formDataState.errors.email = emailValidator;
      formDataState.errors.password = passwordValidator;
      setSignInFormData(formDataState);
      addAlert({ type: 'error', message: formDataState.message });
    }
  };

  return (
    <div className="sign-in">
      <Logo src={logoSrc} />

      <InfoText title={title} description={description} />

      <Socials socials={socials} socialText={socialText} />

      <form onSubmit={handleSubmit} className="sign-in__form">
        <Input
          id="email"
          type="email"
          name="email"
          label="E-mail"
          value={signInFormData.fields.email}
          onBlur={() => handleInputValidate('email')}
          onChange={handleChange}
          placeholder="Enter your E-mail"
          isInvalid={!signInFormData.errors.email.valid}
          invalidMessage={signInFormData.errors.email.message}
        />
        <Input
          id="password"
          type="password"
          name="password"
          label="Password"
          value={signInFormData.fields.password}
          onBlur={() => handleInputValidate('password')}
          onChange={handleChange}
          placeholder="Enter your Password"
          isInvalid={!signInFormData.errors.password.valid}
          invalidMessage={signInFormData.errors.password.message}
        />
        <Button type="submit" context="primary" loading={loading} fluid>
          Sign-in
        </Button>
      </form>

      <Links links={authLinks} />
    </div>
  );
}
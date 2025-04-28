import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { isBrowser } from '@repo/services/window/window';

import { cpfFormatter } from '@repo/services/formatter/document/document';
import { mobileFormatter } from '@repo/services/formatter/contact/contact';

import type {
  ValidatorMessage,
  ValidatorParams,
} from '@repo/services/validator/interface';
import {
  emailValidator,
  mobileValidator,
} from '@repo/services/validator/contact/contact';
import {
  confirmPasswordValidator,
  passwordValidator,
} from '@repo/services/validator/password/password';
import { cpfValidator } from '@repo/services/validator/document/document';
import {
  genderValidator,
  nameValidator,
} from '@repo/services/validator/personal/personal';
import { dateOfBirthValidator } from '@repo/services/validator/date/date';

import { EGender } from '@repo/business/shared/enum';

import Input from '@repo/ds/components/input/Input';
import Button from '@repo/ds/components/button/Button';
import RadioGroup from '@repo/ds/components/radio-group/RadioGroup';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import {authService, generateUrl, getLogoUrl} from '../../shared';

import type { TLink } from '../../components/links/Links';
import type { TSocial } from '../../components/socials/Socials';

import { InfoText, Links, Logo, Socials } from '../../components';

import './SignUp.scss';

type FormDataError = ValidatorMessage & {
  validator: (validatorParams: ValidatorParams) => ValidatorMessage;
};

type SignUpFormDataError = {
  cpf: FormDataError;
  name: FormDataError;
  email: FormDataError;
  gender: FormDataError;
  whatsapp: FormDataError;
  password: FormDataError;
  date_of_birth: FormDataError;
  password_confirmation: FormDataError;
};

type SignUpFormDataFields = {
  cpf: string;
  name: string;
  email: string;
  gender: string;
  whatsapp: string;
  password: string;
  date_of_birth: string;
  password_confirmation: string;
};

type SignUpFormData = {
  valid: boolean;
  fields: SignUpFormDataFields;
  errors: SignUpFormDataError;
  message?: string;
  formData?: FormData;
};

const DefaultFormSignUpFormData: SignUpFormData = {
  valid: true,
  fields: {
    cpf: '',
    name: '',
    email: '',
    gender: '',
    whatsapp: '',
    password: '',
    date_of_birth: '',
    password_confirmation: '',
  },
  errors: {
    cpf: {
      valid: true,
      message: '',
      validator: cpfValidator,
    },
    name: {
      valid: true,
      message: '',
      validator: nameValidator,
    },
    email: {
      valid: true,
      message: '',
      validator: emailValidator,
    },
    gender: {
      valid: true,
      message: '',
      validator: genderValidator,
    },
    whatsapp: {
      valid: true,
      message: '',
      validator: mobileValidator,
    },
    password: {
      valid: true,
      message: '',
      validator: passwordValidator,
    },
    date_of_birth: {
      valid: true,
      message: '',
      validator: dateOfBirthValidator,
    },
    password_confirmation: {
      valid: true,
      message: '',
      validator: confirmPasswordValidator,
    },
  },
};

export default function SignUp() {
  const { addAlert } = useAlert();
  const router = useRouter();
  const searchParams = useSearchParams();
  const env = searchParams.get('env') ?? undefined;
  const source = searchParams.get('source') ?? undefined;
  const redirectTo = searchParams.get('redirectTo') ?? undefined;

  const title = 'Create an Account';
  const description =
    'By creating an account, you agree to our Terms of Service and Privacy Policy.';
  const socialText = 'Or register with your email';

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
      order: 1,
      title: 'Already have an account ?',
      label: 'Sign in here',
      context: 'neutral',
      onClick: () => redirectToPage('/sign-in'),
    },
  ];

  const socials: Array<TSocial> = [
    {
      label: 'Sign up with GitHub',
      onClick: () => redirectToPage('/sign-up?type=github'),
      platform: 'github',
    },
    {
      label: 'Sign up with Google',
      onClick: () => redirectToPage('/sign-up?type=google'),
      platform: 'google',
    },
    {
      label: 'Sign up with Facebook',
      onClick: () => redirectToPage('/sign-up?type=facebook'),
      platform: 'facebook',
    },
  ];

  const [signUpFormData, setSignUpFormData] = useState<SignUpFormData>(
    DefaultFormSignUpFormData,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const signUpService = async () => {
    if (!signUpFormData.valid) {
      return;
    }

    const {
      cpf,
      name,
      email,
      gender,
      whatsapp,
      password,
      date_of_birth,
      password_confirmation,
    } = signUpFormData.fields;

    setLoading(true);
    try {
      await authService.signUp({
        cpf,
        name,
        email,
        gender: gender as EGender,
        whatsapp,
        password,
        date_of_birth: new Date(date_of_birth),
        password_confirmation,
      });
      addAlert({ type: 'success', message: 'User created successfully!' });
      const redirectToUrl = generateUrl({
        destination: '/sign-in',
        env,
        source,
        redirectTo,
      });
      router.push(redirectToUrl.toString());
    } catch (error) {
      addAlert({
        type: 'error',
        message: 'Unable to create user, please try again later',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formValidate();
    handleAuthFormData();
    await signUpService();
  };

  const handleAuthFormData = () => {
    const formData = new FormData();
    Object.entries(signUpFormData.fields).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    setSignUpFormData((prev) => ({
      ...prev,
      formData,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpFormData((prev) => ({
      ...prev,
      fields: { ...prev.fields, [name]: value },
    }));
  };

  const handleChangeRadio = (name: string, value: string) => {
    setSignUpFormData((prev) => ({
      ...prev,
      fields: { ...prev.fields, [name]: value },
    }));
  };

  const inputValidate = (name: string) => {
    const value = signUpFormData.fields[name as keyof SignUpFormDataFields];
    const formDataErrorField =
      signUpFormData.errors[name as keyof SignUpFormDataError];
    const validate =
      name === 'password_confirmation'
        ? formDataErrorField.validator({
            value,
            optionalValue: signUpFormData.fields.password,
          })
        : formDataErrorField.validator({ value });
    return {
      ...formDataErrorField,
      ...validate,
    };
  };

  const handleInputValidate = (name: string) => {
    const validate = inputValidate(name);
    setSignUpFormData((prev) => ({
      ...prev,
      errors: { ...prev.errors, [name]: validate },
    }));
  };

  const formValidate = () => {
    const formDataState = { ...signUpFormData };
    const messages = [];
    const cpfValidator = inputValidate('cpf');
    if (!cpfValidator.valid) {
      messages.push(`cpf: ${cpfValidator.message}`);
    }
    const nameValidator = inputValidate('name');
    if (!nameValidator.valid) {
      messages.push(`name: ${nameValidator.message}`);
    }
    const emailValidator = inputValidate('email');
    if (!emailValidator.valid) {
      messages.push(`email: ${emailValidator.message}`);
    }
    const genderValidator = inputValidate('gender');
    if (!genderValidator.valid) {
      messages.push(`gender: ${genderValidator.message}`);
    }
    const whatsappValidator = inputValidate('whatsapp');
    if (!whatsappValidator.valid) {
      messages.push(`whatsapp: ${whatsappValidator.message}`);
    }
    const dateOfBirthValidator = inputValidate('date_of_birth');
    if (!dateOfBirthValidator.valid) {
      messages.push(`date_of_birth: ${dateOfBirthValidator.message}`);
    }
    const passwordValidator = inputValidate('password');
    if (!passwordValidator.valid) {
      messages.push(`password: ${passwordValidator.message}`);
    }
    const passwordConfirmationValidator = inputValidate(
      'password_confirmation',
    );
    if (!passwordConfirmationValidator.valid) {
      messages.push(
        `password_confirmation: ${passwordConfirmationValidator.message}`,
      );
    }
    if (messages.length > 0) {
      formDataState.valid = false;
      formDataState.message = messages
        .map((message) => `   ${message}`)
        .join('\n');
      formDataState.errors.cpf = cpfValidator;
      formDataState.errors.name = nameValidator;
      formDataState.errors.email = emailValidator;
      formDataState.errors.gender = genderValidator;
      formDataState.errors.whatsapp = whatsappValidator;
      formDataState.errors.date_of_birth = dateOfBirthValidator;
      formDataState.errors.password = passwordValidator;
      formDataState.errors.password_confirmation =
        passwordConfirmationValidator;
      setSignUpFormData(formDataState);
      addAlert({ type: 'error', message: formDataState.message });
    }
  };

  return (
    <div className="sign-up">
      <Logo src={getLogoUrl(source)} />

      <InfoText title={title} description={description} />

      <Socials socials={socials} socialText={socialText} />

      <form onSubmit={handleSubmit} className="sign-up__form">
        <Input
          id="cpf"
          type="text"
          name="cpf"
          label="CPF"
          value={cpfFormatter(signUpFormData.fields.cpf)}
          onBlur={() => handleInputValidate('cpf')}
          onChange={handleChange}
          placeholder="Enter your CPF"
          isInvalid={!signUpFormData.errors.cpf.valid}
          invalidMessage={signUpFormData.errors.cpf.message}
        />
        <Input
          id="name"
          type="text"
          name="name"
          label="Name"
          value={signUpFormData.fields.name}
          onBlur={() => handleInputValidate('name')}
          onChange={handleChange}
          placeholder="Enter your FullName"
          isInvalid={!signUpFormData.errors.name.valid}
          invalidMessage={signUpFormData.errors.name.message}
        />
        <div className="sign-up__form--gender">
          <RadioGroup
            id="gender"
            name="gender"
            label="Gender"
            options={[
              { label: 'Male', value: EGender.MALE },
              { label: 'Female', value: EGender.FEMALE },
            ]}
            appearance="standard"
            modelValue={signUpFormData.fields.gender}
            onClick={(event) => event.preventDefault()}
            onActionClick={(value) =>
              handleChangeRadio('gender', value as string)
            }
          />
        </div>
        <Input
          id="email"
          type="email"
          name="email"
          label="E-mail"
          value={signUpFormData.fields.email}
          onBlur={() => handleInputValidate('email')}
          onChange={handleChange}
          placeholder="Enter your E-mail"
          isInvalid={!signUpFormData.errors.email.valid}
          invalidMessage={signUpFormData.errors.email.message}
        />
        <Input
          id="whatsapp"
          type="text"
          name="whatsapp"
          label="whatsapp"
          value={mobileFormatter(signUpFormData.fields.whatsapp)}
          onBlur={() => handleInputValidate('whatsapp')}
          onChange={handleChange}
          placeholder="Enter your Whatsapp"
          isInvalid={!signUpFormData.errors.whatsapp.valid}
          invalidMessage={signUpFormData.errors.whatsapp.message}
        />
        <Input
          id="date_of_birth"
          type="text"
          name="date_of_birth"
          label="Date of birth"
          value={signUpFormData.fields.date_of_birth}
          onBlur={() => handleInputValidate('date_of_birth')}
          onChange={handleChange}
          placeholder="Enter your Date of birth"
          isInvalid={!signUpFormData.errors.date_of_birth.valid}
          invalidMessage={signUpFormData.errors.date_of_birth.message}
        />
        <Input
          id="password"
          type="password"
          name="password"
          label="Password"
          value={signUpFormData.fields.password}
          onBlur={() => handleInputValidate('password')}
          onChange={handleChange}
          placeholder="Enter your Password"
          isInvalid={!signUpFormData.errors.password.valid}
          invalidMessage={signUpFormData.errors.password.message}
        />
        <Input
          id="password_confirmation"
          type="password"
          name="password_confirmation"
          label="Confirm Password"
          value={signUpFormData.fields.password_confirmation}
          onBlur={() => handleInputValidate('password_confirmation')}
          onChange={handleChange}
          placeholder="Confirm Password"
          isInvalid={!signUpFormData.errors.password_confirmation.valid}
          invalidMessage={signUpFormData.errors.password_confirmation.message}
        />
        <Button type="submit" context="neutral" loading={loading} fluid>
          Sign-up
        </Button>
      </form>

      <Links links={authLinks} />
    </div>
  );
}
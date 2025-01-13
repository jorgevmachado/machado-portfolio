import React, { useEffect, useState } from 'react';

import formatter from '@repo/services/formatter/formatter';
import validator from '@repo/services/validator/validator';

import { EGender } from '@repo/business/api/nest/enum';
import { ERole } from '@repo/business/shared/enum';

import Button from '@repo/ds/components/button/Button';
import Input from '@repo/ds/components/input/Input';
import RadioGroup from '@repo/ds/components/radio-group/RadioGroup';
import joinClass from '@repo/ds/utils/join-class/joinClass';

import type { OnAuthSubmit, TAuth } from '../interface';

import type { FormProps, TInput } from './interface';

import './Form.scss';

export default function Form({
  user,
  type,
  context,
  onSubmit,
  buttonLabel,
  ...props
}: FormProps) {
  const [cpf, setCpf] = useState<string>(user?.cpf ?? '');
  const [onBlurCpf, setOnBlurCpf] = useState<boolean>(false);
  const [invalidCpf, setInvalidCpf] = useState<boolean>(false);
  const invalidCpfMessage: string = 'The field must be a valid CPF';

  const [name, setName] = useState<string>(user?.name ?? '');
  const [onBlurName, setOnBlurName] = useState<boolean>(false);
  const [invalidName, setInvalidName] = useState<boolean>(false);
  const invalidNameMessage = 'The field must be a valid Name';

  const [email, setEmail] = useState<string>(user?.email ?? '');
  const [onBlurEmail, setOnBlurEmail] = useState<boolean>(false);
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const invalidEmailMessage = 'The field must be a valid email';

  const [gender, setGender] = useState<string>(user?.gender ?? '');
  const [invalidGender, setInvalidGender] = useState<boolean>(false);
  const invalidGenderMessage = 'The field must be a valid Gender';

  const [whatsUp, setWhatsUp] = useState<string>(user?.whatsup ?? '');
  const [onBlurWhatsUp, setOnBlurWhatsUp] = useState<boolean>(false);
  const [invalidWhatsUp, setInvalidWhatsUp] = useState<boolean>(false);
  const invalidWhatsUpMessage = 'The field must be a valid WhatsUp';

  const [password, setPassword] = useState<string>('');
  const [onBlurPassword, setOnBlurPassword] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const invalidPasswordMessage = 'The field must be a valid password';

  const [dateOfBirth, setDateOfBirth] = useState<string>(
    user?.date_of_birth?.toString() ?? '',
  );
  const [onBlurDateOfBirth, setOnBlurDateOfBirth] = useState<boolean>(false);
  const [invalidDateOfBirth, setInvalidDateOfBirth] = useState<boolean>(false);
  const invalidDateOfBirthMessage = 'The field must be a valid date';

  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [onBlurPasswordConfirmation, setOnBlurPasswordConfirmation] =
    useState<boolean>(false);
  const [invalidPasswordConfirmation, setInvalidPasswordConfirmation] =
    useState<boolean>(false);
  const invalidPasswordConfirmationMessage =
    'The field must be a valid password';

  const validateInput = (blur: boolean, value: string, type: TInput) => {
    if (blur) {
      switch (type) {
        case 'cpf': {
          const valid = validator.isValidCpf(value);
          setInvalidCpf(!valid);
          return valid;
        }
        case 'email': {
          const valid = validator.isValidEmail(value);
          setInvalidEmail(!valid);
          return valid;
        }
        case 'gender': {
          const valid = value === 'MALE' || value === 'FEMALE';
          setInvalidGender(!valid);
          return valid;
        }
        case 'whatsUp': {
          const valid = value !== '' ? validator.isValidMobile(value) : false;
          setInvalidWhatsUp(!valid);
          return valid;
        }
        case 'password': {
          const valid = validator.isValidPassword(value);
          setInvalidPassword(!valid);
          return valid;
        }
        case 'dateOfBirth': {
          const valid = value !== '';
          setInvalidDateOfBirth(!valid);
          return valid;
        }
        case 'passwordConfirmation': {
          const valid = validator.isValidPassword(value);
          setInvalidPasswordConfirmation(!valid);
          return valid;
        }
        case 'name':
        default: {
          const valid = value !== '';
          setInvalidName(!valid);
          return valid;
        }
      }
    }
    return false;
  };

  const validateAll = (type: TAuth) => {
    const result: OnAuthSubmit = {
      valid: false,
      result: undefined,
      messages: [],
    };
    setInvalidCpf(false);
    setInvalidName(false);
    setInvalidEmail(false);
    setInvalidGender(false);
    setInvalidWhatsUp(false);
    setInvalidPassword(false);
    setInvalidDateOfBirth(false);
    setInvalidPasswordConfirmation(false);

    if (type !== 'forgotPassword') {
      const validEmail = validateInput(true, email, 'email');
      if (!validEmail) {
        result.messages.push(invalidEmailMessage);
      }
    }

    if (type === 'signUp' || type === 'update') {
      const validCpf = validateInput(true, cpf, 'cpf');
      if (!validCpf) {
        result.messages.push(invalidCpfMessage);
      }

      const validName = validateInput(true, name, 'name');
      if (!validName) {
        result.messages.push(invalidNameMessage);
      }

      const validGender = validateInput(true, gender, 'gender');
      if (!validGender) {
        result.messages.push(invalidGenderMessage);
      }

      const validWhatsUp = validateInput(true, whatsUp, 'whatsUp');
      if (!validWhatsUp) {
        result.messages.push(invalidWhatsUpMessage);
      }

      const validDateOfBirth = validateInput(true, dateOfBirth, 'dateOfBirth');
      if (!validDateOfBirth) {
        result.messages.push(invalidDateOfBirthMessage);
      }
    }

    if (type !== 'update') {
      const validPassword = validateInput(true, password, 'password');
      if (!validPassword) {
        result.messages.push(invalidPasswordMessage);
      }
    }

    if (type === 'signUp' || type === 'forgotPassword') {
      const validPasswordConfirmation = validateInput(
        true,
        passwordConfirmation,
        'passwordConfirmation',
      );
      if (!validPasswordConfirmation) {
        result.messages.push(invalidPasswordConfirmationMessage);
      }
    }

    return result;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const onAuthSubmit = validateAll(type);

    if (onAuthSubmit.valid) {
      const currentGender = gender as EGender;
      const currentDateOfBirth = new Date(dateOfBirth);
      onAuthSubmit.result = {
        id: user?.id ?? '',
        cpf,
        role: user?.role ?? ERole.USER,
        name,
        email,
        gender: currentGender ?? EGender.MALE,
        whatsUp,
        password,
        dateOfBirth: currentDateOfBirth,
        passwordConfirmation,
      };
    }

    onSubmit(onAuthSubmit);
  };

  useEffect(() => {
    validateInput(onBlurCpf, cpf, 'cpf');
  }, [cpf, onBlurCpf]);

  useEffect(() => {
    validateInput(onBlurName, name, 'name');
  }, [name, onBlurName]);

  useEffect(() => {
    validateInput(onBlurEmail, email, 'email');
  }, [email, onBlurEmail]);

  useEffect(() => {
    validateInput(false, gender, 'gender');
  }, [gender]);

  useEffect(() => {
    validateInput(onBlurWhatsUp, whatsUp, 'whatsUp');
  }, [whatsUp, onBlurWhatsUp]);

  useEffect(() => {
    validateInput(onBlurPassword, password, 'password');
  }, [password, onBlurPassword]);

  useEffect(() => {
    validateInput(onBlurDateOfBirth, dateOfBirth, 'dateOfBirth');
  }, [dateOfBirth, onBlurDateOfBirth]);

  useEffect(() => {
    validateInput(
      onBlurPasswordConfirmation,
      passwordConfirmation,
      'passwordConfirmation',
    );
  }, [passwordConfirmation, onBlurPasswordConfirmation]);

  const classNameList = joinClass(['form']);
  return (
    <form {...props} className={classNameList} onSubmit={handleSubmit}>
      {type !== 'forgotPassword' && (
        <div className="form__email">
          <Input
            type="email"
            value={email}
            label="E-mail"
            onBlur={() => setOnBlurEmail(true)}
            variant="regular"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            isInvalid={invalidEmail}
            iconContext={context}
            placeholder={`Enter your ${type === 'signUp' ? 'best' : ''} e-mail`}
            invalidMessage={invalidEmailMessage}
          />
        </div>
      )}

      {type !== 'signIn' && type !== 'forgotPassword' && (
        <>
          <div className="form__cpf">
            <Input
              type="text"
              value={formatter.maskCpf(cpf)}
              label="CPF"
              onBlur={() => setOnBlurCpf(true)}
              variant="regular"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCpf(e.target.value)
              }
              isInvalid={invalidCpf}
              iconContext={context}
              placeholder="Enter your CPF"
              invalidMessage={invalidCpfMessage}
            />
          </div>
          <div className="form__name">
            <Input
              type="text"
              value={name}
              label="Name"
              onBlur={() => setOnBlurName(true)}
              variant="regular"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              isInvalid={invalidName}
              iconContext={context}
              placeholder="Enter your Fullname"
              invalidMessage={invalidNameMessage}
            />
          </div>
          <div className="form__whats-up">
            <Input
              type="text"
              value={formatter.maskPhone(whatsUp)}
              label="WhatsUp"
              onBlur={() => setOnBlurWhatsUp(true)}
              variant="regular"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWhatsUp(e.target.value)
              }
              isInvalid={invalidWhatsUp}
              iconContext={context}
              placeholder="Enter your WhatsUp"
              invalidMessage={invalidWhatsUpMessage}
            />
          </div>
          <div className="form__gender">
            <RadioGroup
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
              context={context}
              appearance="standard"
              modelValue={gender}
              onClick={(event) => event.preventDefault()}
              onActionClick={(value) => setGender(value as EGender)}
              requiredMessage={invalidGender ? invalidGenderMessage : ''}
            />
          </div>
          <div className="form__date-of-birth">
            <Input
              type="text"
              value={dateOfBirth}
              label="Date of birth"
              onBlur={() => setOnBlurDateOfBirth(true)}
              variant="regular"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDateOfBirth(e.target.value)
              }
              isInvalid={invalidDateOfBirth}
              iconContext={context}
              placeholder="Enter your date of birth"
              invalidMessage={invalidDateOfBirthMessage}
            />
          </div>
        </>
      )}
      {type !== 'update' && (
        <div className="form__password">
          <Input
            type="password"
            value={password}
            label="Password"
            onBlur={() => setOnBlurPassword(true)}
            variant="regular"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            isInvalid={invalidPassword}
            iconContext={context}
            placeholder={`Enter your ${type === 'signUp' ? 'best' : ''} Password`}
            invalidMessage={invalidPasswordMessage}
          />
        </div>
      )}
      {(type === 'signUp' || type === 'forgotPassword') && (
        <div className="form__password-confirmation">
          <Input
            type="password"
            value={passwordConfirmation}
            label="Password confirmation"
            onBlur={() => setOnBlurPasswordConfirmation(true)}
            variant="regular"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPasswordConfirmation(e.target.value)
            }
            isInvalid={invalidPasswordConfirmation}
            iconContext={context}
            placeholder="Confirm your password"
            invalidMessage={invalidPasswordConfirmationMessage}
          />
        </div>
      )}

      <div className="form__button">
        <Button type="submit" fluid context={context}>
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
}

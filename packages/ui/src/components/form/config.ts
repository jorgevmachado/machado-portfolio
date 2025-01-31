import { EGender } from '@repo/business/shared/enum';

import {
  confirmPasswordValidator,
  passwordValidator,
} from '@repo/services/validator/password/password';
import {
  dateOfBirthValidator,
  genderValidator,
  nameValidator,
} from '@repo/services/validator/personal/personal';
import {
  emailValidator,
  mobileValidator,
} from '@repo/services/validator/contact/contact';
import { cpfValidator } from '@repo/services/validator/document/document';

import { cpfFormatter } from '@repo/services/formatter/document/document';
import { mobileFormatter } from '@repo/services/formatter/contact/contact';

import { FormType, InputType } from './interface';

export const FORM_TYPE: Array<FormType> = [
  {
    type: 'signUp',
    inputs: [
      'cpf',
      'name',
      'email',
      'gender',
      'whatsapp',
      'password',
      'dateOfBirth',
      'passwordConfirmation',
    ],
    buttonLabel: 'Sign Up',
  },
  {
    type: 'signIn',
    inputs: ['email', 'password'],
    buttonLabel: 'Sign In',
  },
  {
    type: 'update',
    inputs: ['cpf', 'name', 'email', 'gender', 'whatsapp', 'dateOfBirth'],
    buttonLabel: 'Update',
  },
  {
    type: 'forgotPassword',
    inputs: ['email'],
    buttonLabel: 'Send',
  },
  {
    type: 'resetPassword',
    inputs: ['password', 'passwordConfirmation'],
    buttonLabel: 'Send',
  },
];

export const INPUT_TYPE: Array<InputType> = [
  {
    id: 'cpf',
    type: 'text',
    name: 'cpf',
    label: 'CPF',
    validate: cpfValidator,
    formatter: cpfFormatter,
    placeholder: 'Enter your CPF',
  },
  {
    id: 'name',
    type: 'text',
    name: 'name',
    label: 'Name',
    validate: nameValidator,
    placeholder: 'Enter your Fullname',
  },
  {
    id: 'gender',
    type: 'radio-group',
    name: 'gender',
    label: 'Gender',
    options: [
      { label: 'Male', value: EGender.MALE },
      { label: 'Female', value: EGender.FEMALE },
    ],
    validate: genderValidator,
  },
  {
    id: 'email',
    type: 'email',
    name: 'email',
    label: 'E-mail',
    validate: emailValidator,
    placeholder: 'Enter your E-mail',
  },
  {
    id: 'whatsapp',
    type: 'phone',
    name: 'whatsapp',
    label: 'Whatsapp',
    validate: mobileValidator,
    formatter: mobileFormatter,
    placeholder: 'Enter your Whatsapp',
  },
  {
    id: 'dateOfBirth',
    type: 'datepicker',
    name: 'dateOfBirth',
    label: 'Date of birth',
    validate: dateOfBirthValidator,
    placeholder: 'Enter your Date of birth',
  },
  {
    id: 'password',
    type: 'password',
    name: 'password',
    label: 'Password',
    validate: passwordValidator,
    placeholder: 'Enter your Password',
  },
  {
    id: 'passwordConfirmation',
    type: 'password',
    name: 'passwordConfirmation',
    label: 'Confirm Password',
    validate: confirmPasswordValidator,
    placeholder: 'Confirm Password',
  },
];

import { cpfValidator } from '@repo/services/validator/document/document';
import { cpfFormatter } from '@repo/services/formatter/document/document';
import {
  genderValidator,
  nameValidator,
} from '@repo/services/validator/personal/personal';
import { EGender } from '@repo/business/shared/enum';
import {
  emailValidator,
  mobileValidator,
} from '@repo/services/validator/contact/contact';
import { mobileFormatter } from '@repo/services/formatter/contact/contact';
import { dateOfBirthValidator } from '@repo/services/validator/date/date';
import {
  confirmPasswordValidator,
  passwordValidator,
} from '@repo/services/validator/password/password';

import type { FormType, InputType } from './types';

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
      'date_of_birth',
      'password_confirmation',
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
    inputs: ['picture','cpf', 'name', 'email', 'gender', 'whatsapp', 'date_of_birth'],
    buttonLabel: 'Update',
  },
];

export const INPUT_TYPE: Array<InputType> = [
  {
    id: 'picture',
    type: 'picture',
    name: 'picture',
    label: 'picture',
    value: 'https://w7.pngwing.com/pngs/173/127/png-transparent-geek-logo-graphy-others-photography-artwork-sales-thumbnail.png',
    validate: cpfValidator,
    placeholder: 'Enter your PICTURE',
  },
  {
    id: 'cpf',
    type: 'text',
    name: 'cpf',
    label: 'CPF',
    value: '',
    validate: cpfValidator,
    formatter: cpfFormatter,
    placeholder: 'Enter your CPF',
  },
  {
    id: 'name',
    type: 'text',
    name: 'name',
    label: 'Name',
    value: '',
    validate: nameValidator,
    placeholder: 'Enter your Fullname',
  },
  {
    id: 'gender',
    type: 'radio-group',
    name: 'gender',
    value: '',
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
    value: '',
    validate: emailValidator,
    placeholder: 'Enter your E-mail',
  },
  {
    id: 'whatsapp',
    type: 'phone',
    name: 'whatsapp',
    label: 'Whatsapp',
    value: '',
    validate: mobileValidator,
    formatter: mobileFormatter,
    placeholder: 'Enter your Whatsapp',
  },
  {
    id: 'date_of_birth',
    type: 'datepicker',
    name: 'date_of_birth',
    label: 'Date of birth',
    value: '',
    validate: dateOfBirthValidator,
    placeholder: 'Enter your Date of birth',
  },
  {
    id: 'password',
    type: 'password',
    name: 'password',
    label: 'Password',
    value: '',
    validate: passwordValidator,
    placeholder: 'Enter your Password',
  },
  {
    id: 'password_confirmation',
    type: 'password',
    name: 'password_confirmation',
    label: 'Confirm Password',
    value: '',
    validate: confirmPasswordValidator,
    placeholder: 'Confirm Password',
  },
];
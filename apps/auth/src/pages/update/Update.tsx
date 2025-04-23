import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { isBrowser } from '@repo/services/window/window';

import { cpfFormatter } from '@repo/services/formatter/document/document';
import { mobileFormatter } from '@repo/services/formatter/contact/contact';

import type {
  ValidatorMessage,
  ValidatorParams,
} from '@repo/services/validator/interface';
import {
  genderValidator,
  nameValidator,
} from '@repo/services/validator/personal/personal';
import { dateOfBirthValidator } from '@repo/services/validator/date/date';

import { EGender } from '@repo/business/shared/enum';
import type { User } from '@repo/business/auth/interface';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import Input from '@repo/ds/components/input/Input';
import Button from '@repo/ds/components/button/Button';

import RadioGroup from '@repo/ds/components/radio-group/RadioGroup';

import {
  authService,
  generateUrl,
  getAccessTokenName,
  getCurrenAccessToken,
  removeAccessToken,
} from '../../shared';

import { InfoText, Logo } from '../../components';

import './Update.scss';

type FormDataError = ValidatorMessage & {
  validator: (validatorParams: ValidatorParams) => ValidatorMessage;
};

type UpdateFormDataError = {
  name: FormDataError;
  gender: FormDataError;
  picture: FormDataError;
  date_of_birth: FormDataError;
};

type UpdateFormDataFields = {
  name: string;
  gender: string;
  picture: string;
  date_of_birth: string;
};

type UpdateFormData = {
  valid: boolean;
  fields: UpdateFormDataFields;
  errors: UpdateFormDataError;
  message?: string;
  formData?: FormData;
};

const DefaultFormUpdateFormData: UpdateFormData = {
  valid: true,
  fields: {
    name: '',
    gender: '',
    picture: '',
    date_of_birth: '',
  },
  errors: {
    name: {
      valid: true,
      message: '',
      validator: nameValidator,
    },
    gender: {
      valid: true,
      message: '',
      validator: genderValidator,
    },
    picture: {
      valid: true,
      message: '',
      validator: nameValidator,
    },
    date_of_birth: {
      valid: true,
      message: '',
      validator: dateOfBirthValidator,
    },
  },
};

export default function Update() {
  const { addAlert } = useAlert();
  const [user, setUser] = useState<User | null>(null);
  const [currentPicture, setCurrentPicture] = useState<File | undefined>(
    undefined,
  );

  const router = useRouter();
  const searchParams = useSearchParams();
  const env = searchParams.get('env') ?? undefined;
  const source = searchParams.get('source') ?? undefined;
  const redirectTo = searchParams.get('redirectTo') ?? undefined;

  const token = useMemo(() => getCurrenAccessToken(source) || '', [source]);

  const fetchUser = useCallback(async () => {
    try {
      const fetchedUser = await authService.me();
      setUser(fetchedUser);
    } catch (error) {
      addAlert({ type: 'error', message: 'Your token has expired!' });
      const key = getAccessTokenName(source ?? '');
      removeAccessToken(key);
      // router.push('/');
    }
  }, [addAlert, router]);

  useEffect(() => {
    if (token) {
      fetchUser().then();
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      setUpdateFormData((prev) => ({
        ...prev,
        fields: {
          ...prev.fields,
          name: user.name ?? '',
          gender: user.gender ?? '',
          picture: user.picture ?? '',
          date_of_birth: user.date_of_birth?.toString() ?? '',
        },
      }));
    }
  }, [user]);

  const title = 'Update an Account';
  const logoSrc =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHN5dygQnJFirBww40JLAsLuZHF0kOdBrzLw&s';
  const description =
    'By upgrading an account, you agree to our Terms of Service and Privacy Policy.';

  const [updateFormData, setUpdateFormData] = useState<UpdateFormData>(
    DefaultFormUpdateFormData,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = async () => {
    if (!currentPicture) {
      return;
    }
    setLoading(true);
    try {
      await authService.upload(currentPicture);
    } catch (error) {
      addAlert({
        type: 'error',
        message:
          'Unable to upload this picture at this time, please try again later',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!updateFormData.valid) {
      return;
    }

    const { name, gender, date_of_birth } = updateFormData.fields;
    await handleUpload();
    setLoading(true);
    try {
      await authService.update({
        name,
        gender: gender as EGender,
        date_of_birth: new Date(date_of_birth),
      });
      addAlert({ type: 'success', message: 'User updated successfully!' });
      const redirectToUrl =
        redirectTo ??
        generateUrl({ env, source, redirectTo, error: 'authenticated' });
      isBrowser()
        ? window.open(redirectToUrl, '_self')
        : router.push(redirectToUrl.toString());
    } catch (error) {
      addAlert({
        type: 'error',
        message: 'Unable to update at this time, please try again later',
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
    await handleUpdate();
  };

  const handleAuthFormData = () => {
    const formData = new FormData();
    Object.entries(updateFormData.fields).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    setUpdateFormData((prev) => ({
      ...prev,
      formData,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setCurrentPicture(files[0]);
    }

    setUpdateFormData((prev) => ({
      ...prev,
      fields: { ...prev.fields, [name]: value },
    }));
  };

  const handleChangeRadio = (name: string, value: string) => {
    setUpdateFormData((prev) => ({
      ...prev,
      fields: { ...prev.fields, [name]: value },
    }));
  };

  const inputValidate = (name: string) => {
    const value = updateFormData.fields[name as keyof UpdateFormDataFields];
    const formDataErrorField =
      updateFormData.errors[name as keyof UpdateFormDataError];
    const validate = formDataErrorField.validator({ value });
    return {
      ...formDataErrorField,
      ...validate,
    };
  };

  const handleInputValidate = (name: string) => {
    const validate = inputValidate(name);
    setUpdateFormData((prev) => ({
      ...prev,
      errors: { ...prev.errors, [name]: validate },
    }));
  };

  const formValidate = () => {
    const formDataState = { ...updateFormData };
    const messages = [];
    const nameValidator = inputValidate('name');
    if (!nameValidator.valid) {
      messages.push(`name: ${nameValidator.message}`);
    }
    const genderValidator = inputValidate('gender');
    if (!genderValidator.valid) {
      messages.push(`gender: ${genderValidator.message}`);
    }
    const dateOfBirthValidator = inputValidate('date_of_birth');
    if (!dateOfBirthValidator.valid) {
      messages.push(`date_of_birth: ${dateOfBirthValidator.message}`);
    }
    if (messages.length > 0) {
      formDataState.valid = false;
      formDataState.message = messages
        .map((message) => `   ${message}`)
        .join('\n');
      formDataState.errors.name = nameValidator;
      formDataState.errors.gender = genderValidator;
      formDataState.errors.date_of_birth = dateOfBirthValidator;
      setUpdateFormData(formDataState);
      addAlert({ type: 'error', message: formDataState.message });
    }
  };

  return (
    <div className="update">
      <Logo src={logoSrc} />

      <InfoText title={title} description={description} />

      <form onSubmit={handleSubmit} className="update__form">
        <Input
          id="picture"
          type="file"
          name="picture"
          label="Picture"
          value={updateFormData.fields.picture}
          accept="image/*"
          onChange={handleChange}
          isInvalid={!updateFormData.errors.picture.valid}
          invalidMessage={updateFormData.errors.picture.message}
        />
        <Input
          id="cpf"
          type="text"
          name="cpf"
          label="CPF"
          value={cpfFormatter(user?.cpf)}
          disabled
          placeholder="Enter your CPF"
        />
        <Input
          id="name"
          type="text"
          name="name"
          label="Name"
          value={updateFormData.fields.name}
          onBlur={() => handleInputValidate('name')}
          onChange={handleChange}
          placeholder="Enter your FullName"
          isInvalid={!updateFormData.errors.name.valid}
          invalidMessage={updateFormData.errors.name.message}
        />
        <div className="update__form--gender">
          <RadioGroup
            id="gender"
            name="gender"
            label="Gender"
            options={[
              { label: 'Male', value: EGender.MALE },
              { label: 'Female', value: EGender.FEMALE },
            ]}
            appearance="standard"
            modelValue={updateFormData.fields.gender}
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
          value={user?.email}
          disabled
          placeholder="Enter your E-mail"
        />
        <Input
          id="whatsapp"
          type="text"
          name="whatsapp"
          label="whatsapp"
          value={mobileFormatter(user?.whatsapp)}
          disabled
          placeholder="Enter your Whatsapp"
        />
        <Input
          id="date_of_birth"
          type="text"
          name="date_of_birth"
          label="Date of birth"
          value={updateFormData.fields.date_of_birth}
          onBlur={() => handleInputValidate('date_of_birth')}
          onChange={handleChange}
          placeholder="Enter your Date of birth"
          isInvalid={!updateFormData.errors.date_of_birth.valid}
          invalidMessage={updateFormData.errors.date_of_birth.message}
        />
        <Button type="submit" context="primary" loading={loading} fluid>
          Save
        </Button>
      </form>
    </div>
  );
}
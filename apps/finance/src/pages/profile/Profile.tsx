'use client';
import React from 'react';
import './Profile.scss';
import useUser from '@repo/ui/hooks/user/useUser';
import Form from './form';
import { AuthForm } from './form/types';

export default function Profile() {
  const { user } = useUser();

  const handleSubmit = (authForm: AuthForm) => {
    // TODO MUST BE REMOVED BEFORE COMMIT
    console.log('# => authForm => ', authForm);
  };

  return (
    <>
      <Form
        user={user}
        type="update"
        context="primary"
        onSubmit={handleSubmit}
        buttonLabel="Save"
      />
      {/*<Form type="signUp" context="primary" onSubmit={handleSubmit} buttonLabel="Save" />*/}
      {/*<div className="profile">*/}
      {/*  <h1 className="profile__title">Profile</h1>*/}

      {/*  <form className="profile__form">*/}
      {/*    /!* Upload de Avatar *!/*/}
      {/*    <div className="profile__avatar">*/}
      {/*      <img*/}
      {/*          src={formData.picture || '/default-avatar.png'} // Imagem padrão caso nenhum avatar seja fornecido.*/}
      {/*          alt={`Avatar de ${formData.name || 'usuário'}`} // Texto explicativo.*/}
      {/*          className="profile__avatar-image"*/}
      {/*      />*/}
      {/*      <label htmlFor="avatar-upload" className="profile__avatar-label">*/}
      {/*        <span className="profile__avatar-button">Choose Photo</span>*/}
      {/*        <input*/}
      {/*            id="avatar-upload"*/}
      {/*            type="file"*/}
      {/*            accept="image/*"*/}
      {/*            className="profile__avatar-input"*/}
      {/*            onChange={handleFileChange}*/}
      {/*        />*/}
      {/*      </label>*/}
      {/*    </div>*/}

      {/*    <div className="profile__form-group">*/}
      {/*      <Input*/}
      {/*          id="cpf"*/}
      {/*          type="text"*/}
      {/*          name="cpf"*/}
      {/*          label="CPF"*/}
      {/*          value={formData?.cpf || ''}*/}
      {/*          context="primary"*/}
      {/*          onChange={handleChange}*/}
      {/*          formatter={cpfFormatter}*/}
      {/*          validate={(value) => cpfValidator(value)}*/}
      {/*          placeholder="Enter your CPF"*/}
      {/*      />*/}
      {/*    </div>*/}

      {/*    <div className="profile__form-group">*/}
      {/*      <Input*/}
      {/*          id="name"*/}
      {/*          type="text"*/}
      {/*          name="name"*/}
      {/*          label="Name"*/}
      {/*          value={formData?.name || ''}*/}
      {/*          context="primary"*/}
      {/*          onChange={handleChange}*/}
      {/*          validate={(value) => nameValidator(value)}*/}
      {/*          placeholder="Enter a Name"*/}
      {/*      />*/}
      {/*    </div>*/}

      {/*    <div>*/}
      {/*      <Input*/}
      {/*          id="gender"*/}
      {/*          type="radio-group"*/}
      {/*          name="gender"*/}
      {/*          label="Gender"*/}
      {/*          options={[*/}
      {/*            { label: 'Male', value: EGender.MALE },*/}
      {/*            { label: 'Female', value: EGender.FEMALE },*/}
      {/*          ]}*/}
      {/*          value={formData?.name || ''}*/}
      {/*          context="neutral"*/}
      {/*          onChange={(value) => console.log('# => gender => ', value)}*/}
      {/*          validate={(value) => genderValidator(value)}*/}
      {/*          placeholder="Enter a Name"*/}
      {/*      />*/}
      {/*    </div>*/}

      {/*    <div className="profile__form-group">*/}
      {/*      <Input*/}
      {/*          id="email"*/}
      {/*          type="text"*/}
      {/*          name="email"*/}
      {/*          label="E-mail"*/}
      {/*          value={formData?.email || ''}*/}
      {/*          context="primary"*/}
      {/*          onChange={handleChange}*/}
      {/*          validate={(value) => emailValidator(value)}*/}
      {/*          placeholder="Enter your E-mail"*/}
      {/*      />*/}
      {/*    </div>*/}

      {/*    <div className="profile__form-group">*/}
      {/*      <Input*/}
      {/*          id="whatsapp"*/}
      {/*          type="phone"*/}
      {/*          name="whatsapp"*/}
      {/*          label="Whatsapp"*/}
      {/*          value={formData?.whatsapp || ''}*/}
      {/*          context="primary"*/}
      {/*          formatter={mobileFormatter}*/}
      {/*          onChange={handleChange}*/}
      {/*          validate={(value) => mobileValidator(value)}*/}
      {/*          placeholder="Enter your Whatsapp"*/}
      {/*      />*/}
      {/*    </div>*/}

      {/*    <div className="profile__form-group">*/}
      {/*      <Input*/}
      {/*          id="dateOfBirth"*/}
      {/*          type="datepicker"*/}
      {/*          name="dateOfBirth"*/}
      {/*          label="Date of birth"*/}
      {/*          value={formData?.date_of_birth.toString() || ''}*/}
      {/*          context="primary"*/}
      {/*          onChange={handleChange}*/}
      {/*          validate={(value) => dateOfBirthValidator(value)}*/}
      {/*          placeholder="Enter your Date of birth"*/}
      {/*      />*/}
      {/*    </div>*/}

      {/*    /!* Ações *!/*/}
      {/*    <div className="profile__actions">*/}
      {/*      <button*/}
      {/*          className="profile__actions-button profile__actions-button--save"*/}
      {/*          onClick={handleSave}*/}
      {/*          type="button"*/}
      {/*      >*/}
      {/*        Save*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*  </form>*/}
      {/*</div>*/}
    </>
  );
}
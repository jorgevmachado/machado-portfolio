import React, { useState } from 'react';
import Input from './Input';
import Icon from '@repo/ds/elements/icon/Icon';
import Button from "@repo/ds/components/button/Button";

export default function Dashboard() {
  const [form, setForm] = useState({
    name: '',
    bed: '',
    hotel: '',
    contact: '',
    password: '',
    prepend: '',
    append: '',
    prependAppend: '',
    description: '',
    file: undefined,
    picture: undefined,
  });
  const [errors, setErrors] = useState({
    name: '',
    bed: '',
    hotel: '',
    contact: '',
    password: '',
    prepend: '',
    append: '',
    prependAppend: '',
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      const files = e.target.files;
      setForm((prev) => ({
        ...prev,
        [name]: files ? files[0] : undefined,
      }));
    }
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {
      name: form.name ? '' : 'Name is required',
      bed: form.bed ? '' : 'Bed is required',
      hotel: form.hotel ? '' : 'Hotel is required',
      contact: form.contact ? '' : 'Contact is required',
      password: form.password ? '' : 'Password is required',
      description: form.description ? '' : 'Description is required',
      prepend: form.prepend ? '' : 'Prepend is required',
      append: form.append ? '' : 'Append is required',
      prependAppend: form.prependAppend ? '' : 'Prepend Append is required',
    };
    setErrors(newErrors);

    console.log('Form submitted', form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ gap: '2rem', display: 'flex', flexDirection: 'column' }}
    >
      <Input
        tip="(new name)"
        label="Name"
        type="text"
        name="name"
        value={form.name}
        placeholder="Enter your name"
        required
        helperText="Enter your Real Name"
        onChange={handleChange}
        invalidMessage="Name is required"
      />
      <Input
        label="Bed"
        type="text"
        name="bed"
        icon="bed"
        value={form.bed}
        placeholder="Enter your bed"
        required
        onChange={handleChange}
        invalidMessage={errors.bed}
      />
      <Input
        label="Hotel"
        type="text"
        name="hotel"
        icon="hotel"
        iconPosition="right"
        value={form.hotel}
        placeholder="Enter your hotel"
        required
        onChange={handleChange}
        invalidMessage={errors.hotel}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={form.password}
        placeholder="Enter your password"
        required
        onChange={handleChange}
        invalidMessage={errors.password}
      />
      <Input
        label="Contact"
        type="text"
        name="contact"
        value={form.contact}
        placeholder="Enter your Contact"
        required
        onChange={handleChange}
        invalidMessage={errors.contact}
      >
        <Icon icon="handshake" data-children="icon-left" />
        <Icon icon="lock-open" data-children="icon-right" />
      </Input>
      <Input
          label="Prepend"
          type="text"
          name="prepend"
          value={form.prepend}
          placeholder="Enter your Prepend"
          required
          onChange={handleChange}
          invalidMessage={errors.prepend}
      >
        <Button size="small" context="neutral" data-children="prepend">
          Prepend
        </Button>
      </Input>
      <Input
          label="Append"
          type="text"
          name="append"
          value={form.append}
          placeholder="Enter your Append"
          required
          onChange={handleChange}
          invalidMessage={errors.append}
      >
        <Button size="small" context="neutral" data-children="append">
          Append
        </Button>
      </Input>
      <Input
          label="Prepend Append"
          type="text"
          name="prependAppend"
          value={form.prependAppend}
          placeholder="Enter your Prepend Append"
          required
          onChange={handleChange}
          invalidMessage={errors.prependAppend}
      >
        <Button size="small" context="neutral" data-children="prepend">
          Prepend
        </Button>
        <Button size="small" context="neutral" data-children="append">
          Append
        </Button>
      </Input>
      <Input
        label="Description"
        rows={5}
        type="textarea"
        name="description"
        value={form.description}
        placeholder="Enter a description"
        required
        onChange={handleChange}
        invalidMessage={errors.description}
      />
      <Input
        label="Profile File"
        type="file"
        name="file"
        accept=".pdf,.docx"
        onChange={handleChange}
      />
      <Input
        label="Profile Picture"
        type="file"
        name="picture"
        accept="image/*"
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

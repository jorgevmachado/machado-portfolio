'use client';
import { useActionState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import type { AuthForm } from '@repo/ui/layout/auth/Form/interface';
import Form from '@repo/ui/layout/auth/Form/Form';

import { resetPassword } from '../../../actions';

import './ResetPassword.scss';

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [state, action, pending] = useActionState(resetPassword, {
    valid: false,
    fields: {
      token,
    },
  });

  useEffect(() => {
    if (state?.message) {
      alert(state.message);
    }
  }, [state]);

  const handleSubmit = (authForm: AuthForm) => {
    if (authForm.formData) {
      action(authForm.formData);
    }
  };

  return (
    <div className="reset-password">
      <Form
        type="resetPassword"
        context="primary"
        onSubmit={handleSubmit}
        loading={pending}
      />
    </div>
  );
}

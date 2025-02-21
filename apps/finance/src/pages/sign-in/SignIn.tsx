import { useRouter, useSearchParams } from 'next/navigation';

import Auth from '@repo/ui/layout/auth/Auth';
import type { AuthForm } from '@repo/ui/components/form/interface';

import useAlert from '@repo/ui/hooks/alert/useAlert';

import { authService, setAccessToken } from '../../shared';

import './SignIn.scss';

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/';
  const { addAlert } = useAlert();

  const pending = false;

  const handleSubmit = (authForm: AuthForm) => {
    const { email = '', password = '' } = authForm.fields;
    authService
      .signIn({ email, password })
      .then((response) => {
        setAccessToken(response);
        addAlert({ type: 'success', message: 'Authenticated successfully!' });
        router.push(redirect);
      })
      .catch((error) => {
          const message = error?.statusCode !== 500 && error?.message
              ? error.message
              : 'Unable to authenticate at this time, please try again later';

          addAlert({ type: 'error', message});
      });
  };

  return (
    <Auth
      type="signIn"
      logo={{ src: '/logo/logo.svg', width: '15rem', height: '15rem' }}
      title="Sign in"
      onSubmit={handleSubmit}
      context="primary"
      loading={pending}
      className="sign-in"
      authLinks={[
        {
          order: 1,
          title: 'Dont have an account ?',
          label: 'Register here',
          clickAction: () => router.push('/sign-up'),
        },
        {
          order: 2,
          label: 'I forgot my password',
          clickAction: () => router.push('/forgot-password'),
        },
      ]}
      description="By continuing, you affirm that you are over 18 years old and allow the sharing of your data in interactions with the platform."
    />
  );
}
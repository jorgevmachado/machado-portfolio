import process from 'process';

import { Nest } from '@repo/business/api/nest/Nest';

import { Auth } from '@repo/business/auth/auth';

import { getAccessToken } from '../cookies';

const baseUrl = process.env.NEXT_PUBLIC_API ?? 'http://localhost:3001';
console.log('# => services => baseUrl => ', baseUrl);

const nest = new Nest({
  token: getAccessToken() || '',
  baseUrl,
});

export const authService = new Auth(nest);

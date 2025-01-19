import { Nest } from '@repo/business/api/nest/Nest';

import { Auth } from '@repo/business/auth/auth';

import { getAccessToken } from '../cookies';

const nest = new Nest({
  token: getAccessToken() || '',
  baseUrl: ' http://localhost:3001',
});

export const authService = new Auth(nest);

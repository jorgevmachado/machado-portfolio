import { Nest } from '@repo/business/api/nest/nest';
import { AuthService } from '@repo/business/auth/service';

import { getCurrenAccessToken } from '../token';

const baseUrl = process.env.NEXT_PUBLIC_API ?? 'http://localhost:3001';

const token = getCurrenAccessToken() || '';

const nest = new Nest({ token, baseUrl });

export const authService = new AuthService(nest);

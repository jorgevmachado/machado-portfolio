import { Nest } from '@repo/business/api/nest/nest';
import { getAccessToken } from '../cookies';
import {AuthService} from "@repo/business";

const baseUrl = process.env.NEXT_PUBLIC_API ?? 'http://localhost:3001';

const token = getAccessToken() || '';

const nest = new Nest({
  token,
  baseUrl,
});

export const authService = new AuthService(nest);
import process from 'process';

import { Nest } from '@repo/business/api/nest/nest';

import { AuthService } from '@repo/business/auth/service';

import { PokemonService } from '@repo/business/pokemon/service';

import { getAccessToken } from '../cookies';

const baseUrl = process.env.NEXT_PUBLIC_API ?? 'http://localhost:3001';
const token = getAccessToken() || '';
console.log('# => services => baseUrl => ', baseUrl);
console.log('# => services => token => ', token);

const nest = new Nest({
  token,
  baseUrl,
});

export const authService = new AuthService(nest);

export const pokemonService = new PokemonService(nest);

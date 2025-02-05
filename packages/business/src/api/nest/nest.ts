import type { INestConfig } from './interface';
import { Auth } from './auth';
import { Pokemon } from './pokemon';

export class Nest {
  private readonly authModule: Auth;
  private readonly pokemonModule: Pokemon;

  constructor({ baseUrl = 'http://localhost:3000', token = '' }: INestConfig) {
    const headers = {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json; charset=UTF-8',
    };
    this.authModule = new Auth(baseUrl, headers);
    this.pokemonModule = new Pokemon(baseUrl, headers);
  }

  get auth(): Auth {
    return this.authModule;
  }

  get pokemon(): Pokemon {
    return this.pokemonModule;
  }
}

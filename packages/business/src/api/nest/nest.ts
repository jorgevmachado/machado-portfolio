import { Http } from '@repo/services/http/http';

import { QueryParameters } from '../../shared';

import { Paginate } from '../../paginate';
import { PokemonEntity } from '../../pokemon/modules';

import type {
  INestConfig,
  ISignInParams,
  ISignUpParams,
  IUser,
} from './interface';

export class Nest extends Http {
  constructor({ baseUrl = 'http://localhost:3000', token = '' }: INestConfig) {
    super(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  public async signUp(params: ISignUpParams): Promise<string> {
    return this.post('auth/signUp', { body: params });
  }

  public async signIn(params: ISignInParams): Promise<{ token: string }> {
    return this.post('auth/signIn', { body: params });
  }

  public async getUser(id: string): Promise<IUser> {
    return this.get(`auth/${id}`);
  }

  public async getAllPokemons(
    parameters: QueryParameters,
  ): Promise<Paginate<PokemonEntity> | Array<PokemonEntity>> {
    return this.get('pokemon', { params: parameters });
  }

  public async getPokemon(param: string): Promise<PokemonEntity> {
    return this.get(`pokemon/${param}`);
  }
}

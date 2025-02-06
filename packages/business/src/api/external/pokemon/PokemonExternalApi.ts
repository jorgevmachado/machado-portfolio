import { Http } from '@repo/services/http/http';

import {
  IExternalResponseOfEvolutionByUrl,
  IExternalResponseOfMoveByUrl,
  IExternalResponseOfPokemonAttributesByPokemonName,
  IExternalResponseOfPokemonSpecieByPokemonName,
  IPokemonExternalConfig,
  IPokemonExternalPaginate,
} from './interface';

export class PokemonExternalApi extends Http {
  constructor({ baseUrl = 'https://pokeapi.co/api/v2' }: IPokemonExternalConfig = {}) {
    super( baseUrl, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async getAll(
    offset: number,
    limit: number,
  ): Promise<IPokemonExternalPaginate> {
    return this.get('pokemon', { params: { offset, limit } });
  }

  async getByName(
    name: string,
  ): Promise<IExternalResponseOfPokemonAttributesByPokemonName> {
    return this.get(`pokemon/${name}`);
  }

  async getSpecieByPokemonName(
    name: string,
  ): Promise<IExternalResponseOfPokemonSpecieByPokemonName> {
    return this.get(`pokemon-species/${name}`);
  }

  async getEvolutionsByOrder(
    order: number,
  ): Promise<IExternalResponseOfEvolutionByUrl> {
    return this.get(`evolution-chain/${order}`);
  }

  async getMoveByOrder(order: number): Promise<IExternalResponseOfMoveByUrl> {
    return this.get(`move/${order}`);
  }
}

import { Http } from '@repo/services/http/http';

import {
  ExternalResponseOfMoveByUrl,
  PokemonExternalPaginate,
} from './modules';
import { ExternalResponseOfEvolutionByUrl } from './modules/evolution';
import { ExternalResponseOfPokemonAttributesByPokemonName } from './modules/attributes';
import { ExternalResponseOfPokemonSpecieByPokemonName } from './modules/specie';

export class PokemonExternalApi extends Http {
  constructor() {
    super('https://pokeapi.co/api/v2', {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async getAll(
    offset: number,
    limit: number,
  ): Promise<PokemonExternalPaginate> {
    return this.get('pokemon', { params: { offset, limit } });
  }

  async getByName(
    name: string,
  ): Promise<ExternalResponseOfPokemonAttributesByPokemonName> {
    return this.get(`pokemon/${name}`);
  }

  async getSpecieByPokemonName(
    name: string,
  ): Promise<ExternalResponseOfPokemonSpecieByPokemonName> {
    return this.get(`pokemon-species/${name}`);
  }

  async getEvolutionsByOrder(
    order: number,
  ): Promise<ExternalResponseOfEvolutionByUrl> {
    return this.get(`evolution-chain/${order}`);
  }

  async getMoveByOrder(order: number): Promise<ExternalResponseOfMoveByUrl> {
    return this.get(`move/${order}`);
  }
}

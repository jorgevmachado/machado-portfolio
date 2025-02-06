import { Http } from '@repo/services/http/http';
import {
  IEvolutionByOrderResponse,
  IMoveByOrderResponse,
  IPokeApiConfig,
  IPokemonByNameResponse,
  IPokemonPaginateResponse,
  ISpecieByPokemonNameResponse,
} from './interface';

export class PokeApi extends Http {
  constructor({ baseUrl = 'https://pokeapi.co/api/v2' }: IPokeApiConfig = {}) {
    super(baseUrl, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async getAll(
    offset: number,
    limit: number,
  ): Promise<IPokemonPaginateResponse> {
    return this.get('pokemon', { params: { offset, limit } });
  }

  async getByName(name: string): Promise<IPokemonByNameResponse> {
    return this.get(`pokemon/${name}`);
  }

  async getSpecieByPokemonName(
    name: string,
  ): Promise<ISpecieByPokemonNameResponse> {
    return this.get(`pokemon-species/${name}`);
  }

  async getEvolutionsByOrder(
    order: number,
  ): Promise<IEvolutionByOrderResponse> {
    return this.get(`evolution-chain/${order}`);
  }

  async getMoveByOrder(order: number): Promise<IMoveByOrderResponse> {
    return this.get(`move/${order}`);
  }
}
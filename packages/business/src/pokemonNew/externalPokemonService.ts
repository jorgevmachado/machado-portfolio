import { IPokemonBasicResponse, PokeApi } from '../api';
import Pokemon from './pokemon';

export class ExternalPokemonService {
  public limit: number = 1302;

  private pokeApi = new PokeApi();

  constructor() {
    this.pokeApi = new PokeApi();
  }

  async BuildList({
    offset = 0,
    limit = this.limit,
  }: {
    offset?: number;
    limit?: number;
  }): Promise<Array<Pokemon>> {
    return this.pokeApi
      .getAll(offset, limit)
      .then((response) => this.mapList(response.results));
  }

  private mapList(list: Array<IPokemonBasicResponse>): Array<Pokemon> {
    return list.map(
      (item) =>
        new Pokemon({
          url: item.url,
          name: item.name,
        }),
    );
  }
}
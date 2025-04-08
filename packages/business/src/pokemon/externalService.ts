import { extractLastNumberFromUrl } from '@repo/services/number/number';

import { PokeApi } from '../api';

import Pokemon from './pokemon';
import PokemonMove, { PokemonMoveEntity } from './pokemon-move';
import { PokemonEntity, EvolutionByOrderResponse } from './interface';

export class ExternalPokemonService {
  public limit: number = 1302;

  private pokeApi = new PokeApi();

  constructor() {
    this.pokeApi = new PokeApi();
  }

  async buildList({
    offset = 0,
    limit = this.limit,
  }: {
    offset?: number;
    limit?: number;
  }): Promise<Array<Pokemon>> {
    return this.pokeApi.getAll(offset, limit).then((response) =>
      response?.results?.map(
        (item) =>
          new Pokemon({
            url: item.url,
            name: item.name,
          }),
      ),
    );
  }

  async completeOne(pokemon: PokemonEntity): Promise<Pokemon> {
    return await Promise.all([
      await this.pokeApi.getByName(pokemon.name),
      await this.pokeApi.getSpecieByPokemonName(pokemon.name),
    ]).then(([pokemonByName, specieByPokemonName]) => {
      return new Pokemon({
        ...pokemon,
        pokemonByName,
        specieByPokemonName,
      });
    });
  }

  async buildMove(move: PokemonMoveEntity): Promise<PokemonMove> {
    return this.pokeApi.getMoveByOrder(move.order).then(
      (moveByOrder) =>
        new PokemonMove({
          ...move,
          moveByOrder,
        }),
    );
  }

  async getEvolutions(url: string): Promise<Array<string>> {
    const order = extractLastNumberFromUrl(url);
    return this.pokeApi
      .getEvolutionsByOrder(order)
      .then((response) => [
        response?.chain?.species?.name,
        ...this.getNamesNextEvolution(response.chain.evolves_to),
      ]);
  }

  private getNamesNextEvolution(
    evolves_to: EvolutionByOrderResponse['chain']['evolves_to'],
  ) {
    return evolves_to
      .map((item) =>
        [item.species.name].concat(
          ...this.getNamesNextEvolution(item.evolves_to),
        ),
      )
      .reduce((arr, curr) => [...arr, ...curr], []);
  }
}
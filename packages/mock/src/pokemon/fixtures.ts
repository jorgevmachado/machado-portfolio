import POKEMON_INCOMPLETE_FIXTURE from './jsons/pokemons-incomplete.json';
import Pokemon from '@repo/business/pokemonNew/pokemon';
import { EStatus } from '@repo/business/shared/enum';

export const LIST_ENTITY_INCOMPLETE_POKEMON_FIXTURE: Array<Pokemon> =
  POKEMON_INCOMPLETE_FIXTURE.map(
    (pokemon) =>
      new Pokemon({
        ...pokemon,
        created_at: new Date(pokemon.created_at),
        updated_at: new Date(pokemon.updated_at),
        status: EStatus[pokemon.status as keyof typeof EStatus],
      }),
  );
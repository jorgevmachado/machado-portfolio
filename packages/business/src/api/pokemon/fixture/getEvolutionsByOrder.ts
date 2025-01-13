import { IResponsePokemonEvolution } from '../interface';

export const RESPONSE_GET_EVOLUTIONS_BY_ORDER_BULBASAUR_FIXTURE: IResponsePokemonEvolution =
  {
    chain: {
      evolves_to: [
        {
          evolves_to: [
            {
              evolves_to: [],
              species: {
                url: 'https://pokeapi.co/api/v2/pokemon-species/3/',
                name: 'venusaur',
              },
            },
          ],
          species: {
            url: 'https://pokeapi.co/api/v2/pokemon-species/2/',
            name: 'ivysaur',
          },
        },
      ],
      species: {
        url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
        name: 'bulbasaur',
      },
    },
  };

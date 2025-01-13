import type { ExternalResponseOfEvolutionByUrl } from './interface';

const EXTERNAL_RESPONSE_OF_EVOLUTION_EVOLVES_TO_VENUSAUR: ExternalResponseOfEvolutionByUrl['chain']['evolves_to'] =
  [
    {
      evolves_to: [],
      species: {
        url: 'https://pokeapi.co/api/v2/pokemon-species/3/',
        name: 'venusaur',
      },
    },
  ];

const EXTERNAL_RESPONSE_OF_EVOLUTION_EVOLVES_TO_IVYSAUR: ExternalResponseOfEvolutionByUrl['chain']['evolves_to'] =
  [
    {
      evolves_to: EXTERNAL_RESPONSE_OF_EVOLUTION_EVOLVES_TO_VENUSAUR,
      species: {
        url: 'https://pokeapi.co/api/v2/pokemon-species/2/',
        name: 'ivysaur',
      },
    },
  ];

export const EXTERNAL_RESPONSE_OF_EVOLUTION_BY_URL_BULBASAUR_FIXTURE: ExternalResponseOfEvolutionByUrl =
  {
    chain: {
      evolves_to: EXTERNAL_RESPONSE_OF_EVOLUTION_EVOLVES_TO_IVYSAUR,
      species: {
        url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
        name: 'bulbasaur',
      },
    },
  };

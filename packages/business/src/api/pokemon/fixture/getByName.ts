import type { IResponsePokemonName } from '../interface';

const RESPONSE_GET_BY_NAME_BULBASAUR_TYPES: IResponsePokemonName['types'] = [
  {
    slot: 1,
    type: {
      url: 'https://pokeapi.co/api/v2/type/12/',
      name: 'grass',
    },
  },
  {
    slot: 2,
    type: {
      name: 'poison',
      url: 'https://pokeapi.co/api/v2/type/4/',
    },
  },
];

const RESPONSE_GET_BY_NAME_BULBASAUR_MOVES: IResponsePokemonName['moves'] = [
  {
    move: {
      name: 'razor-wind',
      url: 'https://pokeapi.co/api/v2/move/13/',
    },
  },
  {
    move: {
      name: 'swords-dance',
      url: 'https://pokeapi.co/api/v2/move/14/',
    },
  },
  {
    move: {
      name: 'cut',
      url: 'https://pokeapi.co/api/v2/move/15/',
    },
  },
];

const RESPONSE_GET_BY_NAME_BULBASAUR_STATS: IResponsePokemonName['stats'] = [
  {
    stat: {
      name: 'hp',
      url: 'https://pokeapi.co/api/v2/stat/1/',
    },
    base_stat: 45,
  },
  {
    stat: {
      name: 'attack',
      url: 'https://pokeapi.co/api/v2/stat/2/',
    },
    base_stat: 49,
  },
  {
    stat: {
      name: 'defense',
      url: 'https://pokeapi.co/api/v2/stat/3/',
    },
    base_stat: 49,
  },
  {
    stat: {
      name: 'special-attack',
      url: 'https://pokeapi.co/api/v2/stat/4/',
    },
    base_stat: 65,
  },
  {
    stat: {
      name: 'special-defense',
      url: 'https://pokeapi.co/api/v2/stat/5/',
    },
    base_stat: 65,
  },
  {
    stat: {
      name: 'speed',
      url: 'https://pokeapi.co/api/v2/stat/6/',
    },
    base_stat: 45,
  },
];

const RESPONSE_GET_BY_NAME_BULBASAUR_SPRITES: IResponsePokemonName['sprites'] =
  {
    other: {
      dream_world: {
        back_gray: null,
        front_gray: null,
        back_shiny: null,
        front_shiny: null,
        back_female: null,
        front_female: null,
        back_default: null,
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
        back_transparent: null,
        front_transparent: null,
        back_shiny_female: null,
        front_shiny_female: null,
        back_shiny_transparent: null,
        front_shiny_transparent: null,
      },
    },
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  };

const RESPONSE_GET_BY_NAME_BULBASAUR_ABILITIES: IResponsePokemonName['abilities'] =
  [
    {
      slot: 1,
      ability: {
        name: 'overgrow',
        url: 'https://pokeapi.co/api/v2/ability/65/',
      },
      is_hidden: false,
    },
    {
      slot: 3,
      ability: {
        name: 'chlorophyll',
        url: 'https://pokeapi.co/api/v2/ability/34/',
      },
      is_hidden: true,
    },
  ];

export const RESPONSE_GET_BY_NAME_BULBASAUR: IResponsePokemonName = {
  name: 'bulbasaur',
  order: 1,
  types: RESPONSE_GET_BY_NAME_BULBASAUR_TYPES,
  moves: RESPONSE_GET_BY_NAME_BULBASAUR_MOVES,
  stats: RESPONSE_GET_BY_NAME_BULBASAUR_STATS,
  sprites: RESPONSE_GET_BY_NAME_BULBASAUR_SPRITES,
  abilities: RESPONSE_GET_BY_NAME_BULBASAUR_ABILITIES,
};

import type { IResponsePokemon } from '../interface';
import type { ResponsePaginate } from '../../interface';

export const RESPONSE_GET_ALL_BULBASAUR_FIXTURE: IResponsePokemon = {
  url: 'https://pokeapi.co/api/v2/pokemon/1/',
  name: 'bulbasaur',
};

export const RESPONSE_GET_ALL_IVYSAUR_FIXTURE: IResponsePokemon = {
  url: 'https://pokeapi.co/api/v2/pokemon/2/',
  name: 'ivysaur',
};

export const RESPONSE_GET_ALL_VENUSAUR_FIXTURE: IResponsePokemon = {
  url: 'https://pokeapi.co/api/v2/pokemon/3/',
  name: 'venusaur',
};

export const RESPONSE_GET_ALL_LIST_FIXTURE: Array<IResponsePokemon> = [
  RESPONSE_GET_ALL_BULBASAUR_FIXTURE,
  RESPONSE_GET_ALL_IVYSAUR_FIXTURE,
  RESPONSE_GET_ALL_VENUSAUR_FIXTURE,
];

export const RESPONSE_GET_ALL_PAGINATE_FIXTURE: ResponsePaginate<IResponsePokemon> =
  {
    count: 1302,
    next: null,
    previous: null,
    results: RESPONSE_GET_ALL_LIST_FIXTURE,
  };

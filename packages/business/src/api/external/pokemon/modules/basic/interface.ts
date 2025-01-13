export interface PokemonExternalPaginate {
  next: string;
  count: number;
  results: Array<PokemonExternalBasicResponse>;
  previous: string;
}

export interface PokemonExternalBasicResponse {
  url: string;
  name: string;
}

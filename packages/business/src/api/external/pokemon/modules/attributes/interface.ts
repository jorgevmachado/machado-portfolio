import { PokemonAbilitiesInformationExternalResponse } from '../ability';
import { PokemonMovesInformationExternalResponse } from '../move';
import { PokemonSpritesInformationExternalResponse } from '../sprites';
import { PokemonStatsInformationExternalResponse } from '../stat';
import { PokemonTypesInformationExternalResponse } from '../type';

export interface ExternalResponseOfPokemonAttributesByPokemonName {
  order: number;
  types: PokemonTypesInformationExternalResponse;
  moves: PokemonMovesInformationExternalResponse;
  stats: PokemonStatsInformationExternalResponse;
  sprites: PokemonSpritesInformationExternalResponse;
  abilities: PokemonAbilitiesInformationExternalResponse;
}

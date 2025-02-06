import {
  IPokemonAbilitiesInformationExternalResponse,
  IPokemonMovesInformationExternalResponse,
  IPokemonSpritesInformationExternalResponse,
  IPokemonStatsInformationExternalResponse,
  IPokemonTypesInformationExternalResponse,
} from '../interface';

export interface ExternalResponseOfPokemonAttributesByPokemonName {
  order: number;
  types: IPokemonTypesInformationExternalResponse;
  moves: IPokemonMovesInformationExternalResponse;
  stats: IPokemonStatsInformationExternalResponse;
  sprites: IPokemonSpritesInformationExternalResponse;
  abilities: IPokemonAbilitiesInformationExternalResponse;
}

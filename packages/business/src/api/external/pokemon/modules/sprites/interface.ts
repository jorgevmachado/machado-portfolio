export interface PokemonSpritesInformationExternalResponse {
  other: {
    dream_world: PokemonSpritesUrlInformationExternalResponse;
  };
  front_default: string;
}

interface PokemonSpritesUrlInformationExternalResponse {
  back_gray?: string;
  front_gray?: string;
  back_shiny?: string;
  front_shiny?: string;
  back_female?: string;
  front_female?: string;
  back_default?: string;
  front_default?: string;
  back_transparent?: string;
  front_transparent?: string;
  back_shiny_female?: string;
  front_shiny_female?: string;
  back_shiny_transparent?: string;
  front_shiny_transparent?: string;
}

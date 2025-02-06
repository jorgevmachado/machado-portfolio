import {
  POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_ATTACK_FIXTURE,
  POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_DEFENSE_FIXTURE,
  POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_HP_FIXTURE,
  POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_SPECIAL_ATTACK_FIXTURE,
  POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_SPECIAL_DEFENSE_FIXTURE,
  POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_SPEED_FIXTURE,
} from '../stat';

import type { PokemonStatsAttributes } from './interface';

export const POKEMON_STATS_ATTRIBUTES_BULBASAUR_FIXTURE: PokemonStatsAttributes =
  {
    hp: POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_HP_FIXTURE.base_stat,
    speed: POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_SPEED_FIXTURE.base_stat,
    attack: POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_ATTACK_FIXTURE.base_stat,
    defense:
      POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_DEFENSE_FIXTURE.base_stat,
    special_attack:
      POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_SPECIAL_ATTACK_FIXTURE.base_stat,
    special_defense:
      POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_SPECIAL_DEFENSE_FIXTURE.base_stat,
  };

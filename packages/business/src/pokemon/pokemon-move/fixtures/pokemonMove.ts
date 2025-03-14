import PokemonMove from '../pokemonMove';

import BIND_FIXTURE from './bind.json';
import BODY_SLAM_FIXTURE from './body-slam.json';
import CUT_FIXTURE from './cut.json';
import HEADBUTT_FIXTURE from './headbutt.json';
import RAZOR_WIND_FIXTURE from './razor-wind.json';
import SWORDS_DANCE_FIXTURE from './swords-dance.json';
import TACKLE_FIXTURE from './tackle.json';
import TAKE_DOWN_FIXTURE from './take-down.json';
import VINE_WHIP_FIXTURE from './vine-whip.json';

export const BIND_MOVE_FIXTURE: PokemonMove =
  BIND_FIXTURE as unknown as PokemonMove;

export const BODY_SLAM_MOVE_FIXTURE: PokemonMove =
  BODY_SLAM_FIXTURE as unknown as PokemonMove;

export const CUT_MOVE_FIXTURE: PokemonMove =
  CUT_FIXTURE as unknown as PokemonMove;

export const HEADBUTT_MOVE_FIXTURE: PokemonMove =
  HEADBUTT_FIXTURE as unknown as PokemonMove;

export const RAZOR_WIND_MOVE_FIXTURE: PokemonMove =
  RAZOR_WIND_FIXTURE as unknown as PokemonMove;

export const SWORDS_DANCE_MOVE_FIXTURE: PokemonMove =
  SWORDS_DANCE_FIXTURE as unknown as PokemonMove;

export const TACKLE_MOVE_FIXTURE: PokemonMove =
  TACKLE_FIXTURE as unknown as PokemonMove;

export const TAKE_DOWN_MOVE_FIXTURE: PokemonMove =
  TAKE_DOWN_FIXTURE as unknown as PokemonMove;

export const VINE_WHIP_MOVE_FIXTURE: PokemonMove =
  VINE_WHIP_FIXTURE as unknown as PokemonMove;

export const LIST_MOVE_FIXTURE: Array<PokemonMove> = [
  BIND_MOVE_FIXTURE,
  BODY_SLAM_MOVE_FIXTURE,
  CUT_MOVE_FIXTURE,
  HEADBUTT_MOVE_FIXTURE,
  RAZOR_WIND_MOVE_FIXTURE,
  SWORDS_DANCE_MOVE_FIXTURE,
  TACKLE_MOVE_FIXTURE,
  TAKE_DOWN_MOVE_FIXTURE,
  VINE_WHIP_MOVE_FIXTURE,
];
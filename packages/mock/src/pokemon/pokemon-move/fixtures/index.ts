import Move from '@repo/business/pokemon/pokemon-move/pokemonMove';

import type { MockEntity } from '../../../shared/interface';

import BIND_FIXTURE from './bind.json';
import BODY_SLAM_FIXTURE from './body-slam.json';
import CUT_FIXTURE from './cut.json';
import HEADBUTT_FIXTURE from './headbutt.json';
import RAZOR_WIND_FIXTURE from './razor-wind.json';
import SWORDS_DANCE_FIXTURE from './swords-dance.json';
import TACKLE_FIXTURE from './tackle.json';
import TAKE_DOWN_FIXTURE from './take-down.json';
import VINE_WHIP_FIXTURE from './vine-whip.json';

export const BIND_MOVE_FIXTURE: Move = new Move({
  ...BIND_FIXTURE,
  created_at: new Date(BIND_FIXTURE.created_at),
  updated_at: new Date(BIND_FIXTURE.updated_at),
});

export const BODY_SLAM_MOVE_FIXTURE: Move = new Move({
  ...BODY_SLAM_FIXTURE,
  created_at: new Date(BODY_SLAM_FIXTURE.created_at),
  updated_at: new Date(BODY_SLAM_FIXTURE.updated_at),
});

export const CUT_MOVE_FIXTURE: Move = new Move({
  ...CUT_FIXTURE,
  created_at: new Date(CUT_FIXTURE.created_at),
  updated_at: new Date(CUT_FIXTURE.updated_at),
});

export const HEADBUTT_MOVE_FIXTURE: Move = new Move({
  ...HEADBUTT_FIXTURE,
  created_at: new Date(HEADBUTT_FIXTURE.created_at),
  updated_at: new Date(HEADBUTT_FIXTURE.updated_at),
});

export const RAZOR_WIND_MOVE_FIXTURE: Move = new Move({
  ...RAZOR_WIND_FIXTURE,
  created_at: new Date(RAZOR_WIND_FIXTURE.created_at),
  updated_at: new Date(RAZOR_WIND_FIXTURE.updated_at),
});

export const SWORDS_DANCE_MOVE_FIXTURE: Move = new Move({
  ...SWORDS_DANCE_FIXTURE,
  created_at: new Date(SWORDS_DANCE_FIXTURE.created_at),
  updated_at: new Date(SWORDS_DANCE_FIXTURE.updated_at),
});

export const TACKLE_MOVE_FIXTURE: Move = new Move({
  ...TACKLE_FIXTURE,
  created_at: new Date(TACKLE_FIXTURE.created_at),
  updated_at: new Date(TACKLE_FIXTURE.updated_at),
});

export const TAKE_DOWN_MOVE_FIXTURE: Move = new Move({
  ...TAKE_DOWN_FIXTURE,
  created_at: new Date(TAKE_DOWN_FIXTURE.created_at),
  updated_at: new Date(TAKE_DOWN_FIXTURE.updated_at),
});

export const VINE_WHIP_MOVE_FIXTURE: Move = new Move({
  ...VINE_WHIP_FIXTURE,
  created_at: new Date(VINE_WHIP_FIXTURE.created_at),
  updated_at: new Date(VINE_WHIP_FIXTURE.updated_at),
});

export const LIST_MOVE_FIXTURE: Array<Move> = [
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

export const POKEMON_MOVE_MOCK_ENTITY: MockEntity = {
  id: 'POKEMON_MOVE',
  alias: 'pokemon_moves',
  label: 'Pokemon Moves',
  list: LIST_MOVE_FIXTURE,
};
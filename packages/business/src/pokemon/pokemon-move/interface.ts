import type { IMove } from '../../api/nest/pokemon';
import type { IMoveByOrderResponse } from '../../api';

export type PokemonMoveEntity = IMove;

export interface MoveConstructorParams
  extends Pick<
    PokemonMoveEntity,
    'url' | 'name' | 'power' | 'accuracy' | 'effect_chance'
  > {
  id?: PokemonMoveEntity['id'];
  pp?: PokemonMoveEntity['pp'];
  type?: PokemonMoveEntity['type'];
  order?: PokemonMoveEntity['order'];
  target?: PokemonMoveEntity['target'];
  effect?: PokemonMoveEntity['effect'];
  priority?: PokemonMoveEntity['priority'];
  created_at?: PokemonMoveEntity['created_at'];
  updated_at?: PokemonMoveEntity['updated_at'];
  deleted_at?: PokemonMoveEntity['deleted_at'];
  short_effect?: PokemonMoveEntity['short_effect'];
  damage_class?: PokemonMoveEntity['damage_class'];
  moveByOrder?: IMoveByOrderResponse;
}

export type EnsurePokemonMoveAttributesParams = Omit<MoveConstructorParams, 'id' | 'url' | 'name' | 'created_at' | 'updated_at' | 'deleted_at'>;
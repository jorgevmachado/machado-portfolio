import { Base } from '../../shared';
import type { IMoveByOrderResponse } from '../../api';

import type { PokemonMoveEntity } from './interface';

interface MoveConstructorParams
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

export default class PokemonMove extends Base implements PokemonMoveEntity {
  id: PokemonMoveEntity['id'];
  pp: PokemonMoveEntity['pp'];
  url: PokemonMoveEntity['url'];
  name: PokemonMoveEntity['name'];
  order: PokemonMoveEntity['order'];
  type: PokemonMoveEntity['type'];
  power?: PokemonMoveEntity['power'];
  target: PokemonMoveEntity['target'];
  effect: PokemonMoveEntity['effect'];
  priority: PokemonMoveEntity['priority'];
  accuracy?: PokemonMoveEntity['accuracy'];
  created_at: PokemonMoveEntity['created_at'];
  updated_at: PokemonMoveEntity['updated_at'];
  deleted_at: PokemonMoveEntity['deleted_at'];
  short_effect: PokemonMoveEntity['short_effect'];
  damage_class: PokemonMoveEntity['damage_class'];
  effect_chance?: PokemonMoveEntity['effect_chance'];

  constructor(params?: MoveConstructorParams) {
    super();
    if (params) {
      this.id = params?.id ?? this.id;
      this.url = params?.url ?? this.url;
      this.name = params?.name ?? this.name;
      this.order =
        params?.order ?? this.ensureOrder(this.order, params?.url ?? this.url);
      this.created_at = params?.created_at ?? this.created_at;
      this.updated_at = params?.updated_at ?? this.updated_at;
      this.deleted_at = params?.deleted_at ?? this.deleted_at;
      this.ensureAttributes(params);
    }
  }

  private ensureAttributes(params: MoveConstructorParams) {
    if (params?.moveByOrder) {
      const effect_entries = params.moveByOrder?.effect_entries[0];
      this.pp = params.moveByOrder?.pp ?? this.pp;
      this.type = params.moveByOrder?.type?.name ?? this.type;
      this.power = params.moveByOrder?.power ?? this.power;
      this.target = params.moveByOrder?.target?.name ?? this.target;
      this.effect = effect_entries?.effect ?? this.effect;
      this.priority = params.moveByOrder?.priority ?? this.priority;
      this.accuracy = params.moveByOrder?.accuracy ?? this.accuracy;
      this.short_effect = effect_entries?.short_effect ?? this.short_effect;
      this.damage_class =
        params.moveByOrder?.damage_class?.name ?? this.damage_class;
      this.effect_chance =
        params.moveByOrder?.effect_chance ?? this.effect_chance;
      return;
    }
    this.pp = params?.pp ?? this.pp;
    this.type = params?.type ?? this.type;
    this.power = params?.power ?? this.power;
    this.target = params?.target ?? this.target;
    this.effect = params?.effect ?? this.effect;
    this.priority = params?.priority ?? this.priority;
    this.accuracy = params?.accuracy ?? this.accuracy;
    this.short_effect = params?.short_effect ?? this.short_effect;
    this.damage_class = params?.damage_class ?? this.damage_class;
    this.effect_chance = params?.effect_chance ?? this.effect_chance;
  }
}
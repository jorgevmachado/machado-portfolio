import { ensureOrder } from '../config';
import { ensureAttributes } from './config';

import type { MoveConstructorParams, PokemonMoveEntity } from './interface';

export default class PokemonMove implements PokemonMoveEntity {
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
    if (params) {
      this.id = params?.id ?? this.id;
      this.url = params?.url ?? this.url;
      this.name = params?.name ?? this.name;
      this.order =
          params?.order ?? ensureOrder(this.order, params?.url ?? this.url);
      this.created_at = params?.created_at ?? this.created_at;
      this.updated_at = params?.updated_at ?? this.updated_at;
      this.deleted_at = params?.deleted_at ?? this.deleted_at;
      const {
        pp,
        type,
        power,
        target,
        effect,
        priority,
        accuracy,
        short_effect,
        damage_class,
        effect_chance,
      } = ensureAttributes({
        pp: params?.pp ?? this.pp,
        type: params?.type ?? this.type,
        power: params?.power ?? this.power,
        target: params?.target ?? this.target,
        effect: params?.effect ?? this.effect,
        priority: params?.priority ?? this.priority,
        accuracy: params?.accuracy ?? this.accuracy,
        short_effect: params?.short_effect ?? this.short_effect,
        damage_class: params?.damage_class ?? this.damage_class,
        effect_chance: params?.effect_chance ?? this.effect_chance,
      });

      this.pp = pp;
      this.type = type;
      this.power = power;
      this.target = target;
      this.effect = effect;
      this.priority = priority;
      this.accuracy = accuracy;
      this.short_effect = short_effect;
      this.damage_class = damage_class;
      this.effect_chance = effect_chance;
    }
  }
}
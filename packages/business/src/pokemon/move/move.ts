import { Base } from '../../shared';
import type { IMove } from '../../api/nest/pokemon';
import type { IMoveByOrderResponse } from '../../api';

interface MoveConstructorParams
  extends Pick<IMove, 'url' | 'name' | 'power' | 'accuracy' | 'effect_chance'> {
  id?: IMove['id'];
  pp?: IMove['pp'];
  type?: IMove['type'];
  order?: IMove['order'];
  target?: IMove['target'];
  effect?: IMove['effect'];
  priority?: IMove['priority'];
  created_at?: IMove['created_at'];
  updated_at?: IMove['updated_at'];
  deleted_at?: IMove['deleted_at'];
  short_effect?: IMove['short_effect'];
  damage_class?: IMove['damage_class'];
  moveByOrder?: IMoveByOrderResponse;
}

export default class Move extends Base implements IMove {
  id: IMove['id'];
  pp: IMove['pp'];
  url: IMove['url'];
  name: IMove['name'];
  order: IMove['order'];
  type: IMove['type'];
  power?: IMove['power'];
  target: IMove['target'];
  effect: IMove['effect'];
  priority: IMove['priority'];
  accuracy?: IMove['accuracy'];
  created_at: IMove['created_at'];
  updated_at: IMove['updated_at'];
  deleted_at: IMove['deleted_at'];
  short_effect: IMove['short_effect'];
  damage_class: IMove['damage_class'];
  effect_chance?: IMove['effect_chance'];

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
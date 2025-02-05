import type { MoveEntity } from '../interface';

export class Move implements MoveEntity {
  id: string;
  pp: number;
  url: string;
  name: string;
  type: string;
  order: number;
  power?: number;
  target: string;
  effect: string;
  priority: number;
  accuracy?: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  short_effect: string;
  damage_class: string;
  effect_chance?: number;

  constructor(response?: any, order?: number) {
    this.url = response?.move?.url || this.url;
    this.name = response.move?.name || this.name;
    this.order = order ?? this.order;
  }
}

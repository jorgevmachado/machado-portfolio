import type { IBase } from '../interface';

export interface IMove extends IBase {
  pp: number;
  type: string;
  power?: number;
  target: string;
  effect: string;
  priority: number;
  accuracy?: number;
  short_effect: string;
  damage_class: string;
  effect_chance?: number;
}
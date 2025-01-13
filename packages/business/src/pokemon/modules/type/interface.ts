import type { BaseEntity } from '../entity';

export interface TypeEntity extends BaseEntity {
  text_color: string;
  background_color: string;
}

export interface TypeColor {
  id: number;
  name: string;
  textColor: string;
  backgroundColor: string;
}

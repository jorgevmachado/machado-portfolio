import { ensureOrder } from '../config';

import { findColor } from './config';
import type { PokemonTypeEntity } from './interface';

interface TypeConstructorParams
  extends Omit<
    PokemonTypeEntity,
    | 'id'
    | 'order'
    | 'text_color'
    | 'created_at'
    | 'deleted_at'
    | 'updated_at'
    | 'background_color'
  > {
  id?: string;
  order?: number;
  text_color?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  background_color?: string;
}

export default class PokemonType implements PokemonTypeEntity {
  id!: PokemonTypeEntity['id'];
  url!: PokemonTypeEntity['url'];
  name!: PokemonTypeEntity['name'];
  order!: PokemonTypeEntity['order'];
  created_at!: PokemonTypeEntity['created_at'];
  updated_at!: PokemonTypeEntity['updated_at'];
  deleted_at!: PokemonTypeEntity['deleted_at'];
  text_color!: PokemonTypeEntity['text_color'];
  background_color!: PokemonTypeEntity['background_color'];

  constructor(type?: TypeConstructorParams) {
    if (type) {
      this.id = type.id ?? this.id;
      this.url = type.url;
      this.name = type.name;
      this.order = type.order ?? ensureOrder(this.order, type.url);
      this.created_at = type.created_at ?? this.created_at;
      this.updated_at = type.updated_at ?? this.updated_at;
      this.deleted_at = type.deleted_at ?? this.deleted_at;
      const { text_color, background_color } = findColor(
        type?.name,
        this.text_color,
        this.background_color,
      );
      this.text_color = text_color;
      this.background_color = background_color;
    }
  }
}
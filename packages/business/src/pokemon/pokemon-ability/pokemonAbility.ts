import { ensureOrder } from '../config';

import type { PokemonAbilityEntity } from './interface';

interface AbilityConstructorParams
  extends Pick<PokemonAbilityEntity, 'url' | 'name'> {
  id?: PokemonAbilityEntity['id'];
  slot?: PokemonAbilityEntity['slot'];
  order?: PokemonAbilityEntity['order'];
  is_hidden?: PokemonAbilityEntity['is_hidden'];
  created_at?: PokemonAbilityEntity['created_at'];
  updated_at?: PokemonAbilityEntity['updated_at'];
  deleted_at?: PokemonAbilityEntity['deleted_at'];
}

export default class PokemonAbility implements PokemonAbilityEntity {
  id: PokemonAbilityEntity['id'];
  url: PokemonAbilityEntity['url'];
  slot: PokemonAbilityEntity['slot'];
  name: PokemonAbilityEntity['name'];
  order: PokemonAbilityEntity['order'];
  is_hidden: PokemonAbilityEntity['is_hidden'];
  created_at: PokemonAbilityEntity['created_at'];
  updated_at: PokemonAbilityEntity['updated_at'];
  deleted_at: PokemonAbilityEntity['deleted_at'];

  constructor(ability?: AbilityConstructorParams) {
    if (ability) {
      this.id = ability.id ?? this.id;
      this.url = ability.url ?? this.url;
      this.slot = ability.slot ?? this.slot;
      this.name = ability.name ?? this.name;
      this.order =
        ability.order ?? ensureOrder(this.order, ability.url ?? this.url);
      this.is_hidden = ability.is_hidden ?? this.is_hidden;
      this.created_at = ability.created_at ?? this.created_at;
      this.updated_at = ability.updated_at ?? this.updated_at;
      this.deleted_at = ability.deleted_at ?? this.deleted_at;
    }
  }
}
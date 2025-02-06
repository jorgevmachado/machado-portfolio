import type { PokemonAbilityInformationExternalResponse } from '../external';

import type { AbilityEntity } from '../interface';

export class Ability implements AbilityEntity {
  id: string;
  url: string;
  slot: number;
  name: string;
  order: number;
  is_hidden: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  constructor(
    response?: PokemonAbilityInformationExternalResponse,
    order?: number,
  ) {
    this.url = response?.ability?.url ?? this.url;
    this.name = response?.ability?.name ?? this.name;
    this.slot = response?.slot ?? this.slot;
    this.order = order ?? this.order;
    this.is_hidden = response?.is_hidden ?? this.is_hidden;
  }
}

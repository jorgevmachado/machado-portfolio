import { Base } from '../../shared';
import type { IAbility } from '../../api/nest/pokemon';

interface AbilityConstructorParams extends Pick<IAbility, 'url' | 'name'> {
    id?: IAbility['id'];
    slot?: IAbility['slot'];
    order?: IAbility['order'];
    is_hidden?: IAbility['is_hidden'];
    created_at?: IAbility['created_at'];
    updated_at?: IAbility['updated_at'];
    deleted_at?: IAbility['deleted_at'];
}

export default class Ability extends Base implements IAbility {
  id: IAbility['id'];
  url: IAbility['url'];
  slot: IAbility['slot'];
  name: IAbility['name'];
  order: IAbility['order'];
  is_hidden: IAbility['is_hidden'];
  created_at: IAbility['created_at'];
  updated_at: IAbility['updated_at'];
  deleted_at: IAbility['deleted_at'];

  constructor(ability?: AbilityConstructorParams) {
    super();
    if(ability) {
        this.id = ability.id ?? this.id;
        this.url = ability.url ?? this.url;
        this.slot = ability.slot ?? this.slot;
        this.name = ability.name ?? this.name;
        this.order = ability.order ?? this.ensureOrder(this.order, ability.url ?? this.url);
        this.is_hidden = ability.is_hidden  ?? this.is_hidden
        this.created_at = ability.created_at ?? this.created_at;
        this.updated_at = ability.updated_at ?? this.updated_at;
        this.deleted_at = ability.deleted_at ?? this.deleted_at;
    }
  }
}
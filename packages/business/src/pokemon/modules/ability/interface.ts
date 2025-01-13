import type { BaseEntity } from '../entity';

export interface AbilityEntity extends BaseEntity {
  slot: number;
  is_hidden: boolean;
}

import type { INestModuleConfig } from '../../interface';
import { NestModuleAbstract } from '../../nestModuleAbstract';

import type { IAbility } from './interface';

export class PokemonAbility extends NestModuleAbstract<
  IAbility,
  unknown,
  unknown
> {
  constructor(nestModuleConfig: INestModuleConfig) {
    super({
      pathUrl: 'pokemon',
      subPathUrl: 'ability',
      nestModuleConfig,
    });
  }
}
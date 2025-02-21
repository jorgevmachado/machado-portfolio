import type { INestModuleConfig } from '../../interface';
import { NestModuleAbstract } from '../../nestModuleAbstract';

import type { IMove } from './interface';

export class PokemonMove extends NestModuleAbstract<IMove, unknown, unknown> {
  constructor(nestModuleConfig: INestModuleConfig) {
    super({
      pathUrl: 'pokemon',
      subPathUrl: 'move',
      nestModuleConfig,
    });
  }
}
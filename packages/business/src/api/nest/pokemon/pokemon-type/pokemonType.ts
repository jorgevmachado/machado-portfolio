import type { INestModuleConfig } from '../../interface';

import { NestModuleAbstract } from '../../nestModuleAbstract';

import type { IType } from './interface';

export class PokemonType extends NestModuleAbstract<IType, unknown, unknown> {
  constructor(nestModuleConfig: INestModuleConfig) {
    super('pokemon/type', nestModuleConfig);
  }
}
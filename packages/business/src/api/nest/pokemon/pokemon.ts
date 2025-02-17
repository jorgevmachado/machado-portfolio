import type { INestModuleConfig } from '../interface';
import { NestModuleAbstract } from '../nestModuleAbstract';

import type { IPokemon } from './interface';
import { PokemonType } from './pokemon-type';
import { PokemonMove } from './pokemon-move';
import { PokemonAbility } from './pokemon-ability';

export class Pokemon extends NestModuleAbstract<IPokemon, unknown, unknown> {
  private readonly pokemonTypeModule: PokemonType;
  private readonly pokemonMoveModule: PokemonMove;
  private readonly pokemonAbilityModule: PokemonAbility;
  constructor(nestModuleConfig: INestModuleConfig) {
    super('pokemon', nestModuleConfig);
    this.pokemonAbilityModule = new PokemonAbility(nestModuleConfig);
    this.pokemonMoveModule = new PokemonMove(nestModuleConfig);
    this.pokemonTypeModule = new PokemonType(nestModuleConfig);
  }

  get ability(): PokemonAbility {
    return this.pokemonAbilityModule;
  }

  get move(): PokemonMove {
    return this.pokemonMoveModule;
  }

  get type(): PokemonType {
    return this.pokemonTypeModule;
  }
}
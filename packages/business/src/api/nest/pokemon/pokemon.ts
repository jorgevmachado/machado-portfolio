import { Http } from '@repo/services/http/http';

import type { QueryParameters } from '../../../shared';
import { Paginate } from '../../../paginate';

import type { INestModuleConfig } from '../interface';

import type { IPokemon } from './interface';

import { PokemonType } from './pokemon-type';
import { PokemonMove } from './pokemon-move';
import { PokemonAbility } from './pokemon-ability';

export class Pokemon extends Http {
  private readonly pokemonTypeModule: PokemonType;
  private readonly pokemonMoveModule: PokemonMove;
  private readonly pokemonAbilityModule: PokemonAbility;
  constructor({ baseUrl, headers }: INestModuleConfig) {
    super(baseUrl, { headers });
    this.pokemonAbilityModule = new PokemonAbility({ baseUrl, headers });
    this.pokemonMoveModule = new PokemonMove({ baseUrl, headers });
    this.pokemonTypeModule = new PokemonType({ baseUrl, headers });
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

  public async getAll(
    parameters: QueryParameters,
  ): Promise<Paginate<IPokemon> | Array<IPokemon>> {
    return this.get('pokemon', { params: parameters });
  }

  public async getOne(param: string): Promise<IPokemon> {
    return this.get(`pokemon/${param}`);
  }
}
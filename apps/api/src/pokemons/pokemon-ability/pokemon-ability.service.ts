import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Service } from '../../shared';

import { PokemonAbility } from './pokemon-ability.entity';

@Injectable()
export class PokemonAbilityService extends Service<PokemonAbility> {
  constructor(
    @InjectRepository(PokemonAbility)
    protected repository: Repository<PokemonAbility>,
  ) {
    super('pokemon_abilities', [], repository);
  }

  async findList(types: Array<PokemonAbility>) {
    return await Promise.all(
      types.map(async (response) =>
        this.queries.findOneByOrder<PokemonAbility>({
          order: response.order,
          response,
          withThrow: false,
          completingData: (result, response) =>
            this.completingData(result, response),
        }),
      ),
    );
  }

  async completingData(
    entity: PokemonAbility,
    responseType: PokemonAbility,
  ): Promise<PokemonAbility> {
    if (!entity) {
      await this.save(responseType);

      return await this.queries.findOneByOrder({
        order: responseType.order,
        complete: false,
      });
    }

    return entity;
  }
}

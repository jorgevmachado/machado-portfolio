import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Service } from '../../shared';

import { Ability } from '../entities/ability.entity';

@Injectable()
export class AbilityService extends Service<Ability> {
  constructor(
    @InjectRepository(Ability)
    protected repository: Repository<Ability>,
  ) {
    super('abilities', [], repository);
  }

  async findList(types: Array<Ability>) {
    return await Promise.all(
      types.map(async (response) =>
        this.findOneByOrder<Ability>({
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
    entity: Ability,
    responseType: Ability,
  ): Promise<Ability> {
    if (!entity) {
      await this.save(responseType);

      return await this.findOneByOrder({
        order: responseType.order,
        complete: false,
      });
    }

    return entity;
  }
}

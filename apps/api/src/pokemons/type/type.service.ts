import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Service } from '../../shared';

import { Type } from '../entities/type.entity';

@Injectable()
export class TypeService extends Service<Type> {
  constructor(
    @InjectRepository(Type)
    protected repository: Repository<Type>,
  ) {
    super('types', [], repository);
  }

  async findList(types: Array<Type>) {
    return await Promise.all(
      types.map(async (response) =>
        this.findOneByOrder<Type>({
          order: response.order,
          response,
          withThrow: false,
          completingData: (result, response) =>
            this.completingData(result, response),
        }),
      ),
    );
  }

  async completingData(entity: Type, responseType: Type): Promise<Type> {
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

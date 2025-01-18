import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { PokemonExternalBusiness } from '@repo/business/pokemon/external/pokemonExternalBusiness';

import { Service } from '../../shared';

import { Move } from '../entities/move.entity';

@Injectable()
export class MoveService extends Service<Move> {
  constructor(
    @InjectRepository(Move)
    protected repository: Repository<Move>,
    protected pokemonExternalBusiness: PokemonExternalBusiness,
  ) {
    super('moves', [], repository);
  }

  async findList(moves: Array<Move>) {
    return await Promise.all(
      moves.map(async (move) =>
        this.findOneByOrder<Move>({
          order: move.order,
          response: move,
          withThrow: false,
          completingData: (result, response) =>
            this.completingData(result, response),
        }),
      ),
    );
  }

  async completingData(entity: Move, response: Move) {
    if (!entity) {
      const move = await this.pokemonExternalBusiness
        .getMove(response)
        .then((response) => response)
        .catch((error) => this.error(error));

      await this.save(move);

      return await this.findOneByOrder({ order: move.order, complete: false });
    }

    return entity;
  }
}

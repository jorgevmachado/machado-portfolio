import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ExternalPokemonService } from '@repo/business/pokemon/externalService';

import { Service } from '../../shared';

import { PokemonMove } from './pokemon-move.entity';

@Injectable()
export class PokemonMoveService extends Service<PokemonMove> {
  constructor(
    @InjectRepository(PokemonMove)
    protected repository: Repository<PokemonMove>,
    protected business: ExternalPokemonService,
  ) {
    super('pokemon_moves', [], repository);
  }

  async findList(moves: Array<PokemonMove>) {
    return await Promise.all(
      moves.map(async (move) =>
        this.queries.findOneByOrder<PokemonMove>({
          order: move.order,
          response: move,
          withThrow: false,
          completingData: (result, response) =>
            this.completingData(result, response),
        }),
      ),
    );
  }

  async completingData(entity: PokemonMove, response: PokemonMove) {
    if (!entity) {
      const move = await this.business
        .buildMove(response)
        .then((response) => response)
        .catch((error) => this.error(error));

      await this.save(move);

      return await this.queries.findOneByOrder({ order: move.order, complete: false });
    }

    return entity;
  }
}

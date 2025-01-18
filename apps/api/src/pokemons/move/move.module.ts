import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PokemonExternalBusiness } from '@repo/business/pokemon/external/pokemonExternalBusiness';

import { Move } from '../entities/move.entity';

import { MoveService } from './move.service';

@Module({
  imports: [TypeOrmModule.forFeature([Move])],
  providers: [MoveService, PokemonExternalBusiness],
  exports: [MoveService],
})
export class MoveModule {}

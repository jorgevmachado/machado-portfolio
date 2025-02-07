import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExternalPokemonService } from '@repo/business/pokemon/externalPokemonService';

import { Move } from '../entities/move.entity';

import { MoveService } from './move.service';

@Module({
  imports: [TypeOrmModule.forFeature([Move])],
  providers: [MoveService, ExternalPokemonService],
  exports: [MoveService],
})
export class MoveModule {}

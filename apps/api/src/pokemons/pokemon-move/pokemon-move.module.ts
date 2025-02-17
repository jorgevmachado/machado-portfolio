import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { ExternalPokemonService } from '@repo/business/pokemon/externalPokemonService';

import { PokemonMove } from './pokemon-move.entity';

import { PokemonMoveService } from './pokemon-move.service';

import { PokemonMoveController } from './pokemon-move.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([PokemonMove]),
  ],
  controllers: [PokemonMoveController],
  providers: [PokemonMoveService, ExternalPokemonService],
  exports: [PokemonMoveService],
})
export class PokemonMoveModule {}

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExternalPokemonService } from '@repo/business/pokemon/externalPokemonService';

import { AbilityModule } from './ability/ability.module';
import { MoveModule } from './move/move.module';
import { TypeModule } from './type/type.module';

import { Pokemon } from './entities/pokemon.entity';

import { PokemonController } from './pokemon.controller';

import { PokemonService } from './pokemon.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pokemon]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeModule,
    MoveModule,
    AbilityModule,
  ],
  controllers: [PokemonController],
  providers: [PokemonService, ExternalPokemonService],
})
export class PokemonModule {}

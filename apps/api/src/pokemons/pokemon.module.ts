import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExternalPokemonService } from '@repo/business/pokemon/externalService';

import { PokemonAbilityModule } from './pokemon-ability/pokemon-ability.module';
import { PokemonMoveModule } from './pokemon-move/pokemon-move.module';
import { PokemonTypeModule } from './pokemon-type/pokemon-type.module';

import { Pokemon } from './pokemon.entity';

import { PokemonController } from './pokemon.controller';

import { PokemonService } from './pokemon.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pokemon]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PokemonTypeModule,
    PokemonMoveModule,
    PokemonAbilityModule,
  ],
  controllers: [PokemonController],
  providers: [PokemonService, ExternalPokemonService],
})
export class PokemonModule {}

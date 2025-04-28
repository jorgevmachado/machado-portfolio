import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { PokemonAbility } from './pokemon-ability.entity';

import { PokemonAbilityService } from './pokemon-ability.service';
import { PokemonAbilityController } from './pokemon-ability.controller';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([PokemonAbility]),
  ],
  controllers: [PokemonAbilityController],
  providers: [PokemonAbilityService],
  exports: [PokemonAbilityService],
})
export class PokemonAbilityModule {}

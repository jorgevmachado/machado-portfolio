import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PokemonType } from './pokemon-type.entity';

import { PokemonTypeService } from './pokemon-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonType])],
  providers: [PokemonTypeService],
  exports: [PokemonTypeService],
})
export class PokemonTypeModule {}

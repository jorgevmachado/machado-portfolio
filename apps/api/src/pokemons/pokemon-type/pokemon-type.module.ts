import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { PokemonType } from './pokemon-type.entity';
import { PokemonTypeService } from './pokemon-type.service';
import { PokemonTypeController } from './pokemon-type.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([PokemonType]),
  ],
  controllers: [PokemonTypeController],
  providers: [PokemonTypeService],
  exports: [PokemonTypeService],
})
export class PokemonTypeModule {}

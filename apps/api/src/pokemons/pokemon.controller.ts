import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import type { QueryParameters } from '@repo/business/shared/interface';

import { AuthRoleGuards } from '../auth/guards/auth-role.guards';
import { AuthStatusGuards } from '../auth/guards/auth-status.guards';

import { PokemonService } from './pokemon.service';

@Controller('pokemon')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll(@Query() parameters: QueryParameters) {
    return this.pokemonService.findAll(parameters);
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    return this.pokemonService.findOnePokemon(param);
  }
}

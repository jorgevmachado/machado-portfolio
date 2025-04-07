import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import type { QueryParameters } from '@repo/business/shared/interface';

import { AuthRoleGuards } from '../../guards/auth-role.guards';
import { AuthStatusGuards } from '../../guards/auth-status.guards';

import { PokemonAbilityService } from './pokemon-ability.service';

@Controller('pokemon')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class PokemonAbilityController {
  constructor(private readonly service: PokemonAbilityService) {}

  @Get('list/ability')
  findAll(@Query() parameters: QueryParameters) {
    return this.service.findAll({ parameters });
  }

  @Get(':param/ability')
  findOne(@Param('param') param: string) {
    return this.service.findOne({ value: param });
  }
}
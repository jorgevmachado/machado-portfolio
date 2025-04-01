import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import type { QueryParameters } from '@repo/business/shared/interface';

import { AuthRoleGuards } from '../../guards/auth-role.guards';
import { AuthStatusGuards } from '../../guards/auth-status.guards';

import { PokemonMoveService } from './pokemon-move.service';

@Controller('pokemon')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class PokemonMoveController {
  constructor(private readonly service: PokemonMoveService) {}

  @Get('list/move')
  findAll(@Query() parameters: QueryParameters) {
    return this.service.findAll({ parameters });
  }

  @Get(':param/move')
  findOne(@Param('param') param: string) {
    return this.service.findOne({ value: param });
  }
}
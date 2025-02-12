import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { QueryParameters } from '@repo/business/shared/interface';

import { AuthRoleGuards } from '../../auth/guards/auth-role.guards';
import { AuthStatusGuards } from '../../auth/guards/auth-status.guards';

import { PokemonTypeService } from './pokemon-type.service';

@Controller('pokemon')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class PokemonTypeController {
  constructor(private readonly service: PokemonTypeService) {}

  @Get('list/type')
  findAll(@Query() parameters: QueryParameters) {
    return this.service.list(parameters);
  }

    @Get(':param/type')
    findOne(@Param('param') param: string) {
        return this.service.findOne({ value: param });
    }
}
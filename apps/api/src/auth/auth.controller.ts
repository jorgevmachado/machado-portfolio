import {Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateAuthDto } from './dto/create-auth.dto';
import { CredentialsAuthDto } from './dto/credentials-auth.dto';

import { AuthRoleGuards } from './guards/auth-role.guards';

import { GetUserAuth } from './decorators/auth-user.decorator';

import { AuthService } from './auth.service';

import { User } from './users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('seed')
  seed() {
    return this.authService.seed();
  }

  @Post('signUp')
  signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('signIn')
  signIn(@Body() credentialsAuthDto: CredentialsAuthDto) {
    return this.authService.signIn(credentialsAuthDto);
  }

  @Get('me')
  @UseGuards(AuthGuard(), AuthRoleGuards)
  getMe(@GetUserAuth() user: User) {
    return this.authService.me(user);
  }

  @Get(':id')
  @UseGuards(AuthGuard(), AuthRoleGuards)
  findOne(@GetUserAuth() user: User, @Param('id') id: string) {
    return this.authService.findOne(id, user);
  }

  @Put(':id')
  @UseGuards(AuthGuard(), AuthRoleGuards)
  promoteUser(@GetUserAuth() user: User, @Param('id') id: string) {
    return this.authService.promoteUser(id, user);
  }
}

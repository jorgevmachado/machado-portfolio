import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UseFileUpload } from '../decorators/use-file-upload.decorator';

import { CreateAuthDto } from './dto/create-auth.dto';
import { CredentialsAuthDto } from './dto/credentials-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { AuthRoleGuards } from '../guards/auth-role.guards';

import { GetUserAuth } from '../decorators/auth-user.decorator';

import { AuthService } from './auth.service';

import { User } from './users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('seed')
  seed() {
    return this.authService.seed(false);
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

  @Put(':id/promote')
  @UseGuards(AuthGuard(), AuthRoleGuards)
  promoteUser(@Param('id') id: string, @GetUserAuth() user: User) {
    return this.authService.promoteUser(id, user);
  }

  @Put('update')
  @UseGuards(AuthGuard(), AuthRoleGuards)
  update(
    @Body() updateAuthDto: UpdateAuthDto,
    @GetUserAuth() user: User,
  ) {
    return this.authService.update(updateAuthDto, user);
  }

  @Put('upload')
  @UseGuards(AuthGuard(), AuthRoleGuards)
  @UseFileUpload(['image/jpeg', 'image/png', 'image/jpg'])
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @GetUserAuth() user: User,
  ) {
    return await this.authService.upload(file, user);
  }
}

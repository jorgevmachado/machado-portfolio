import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ERole } from '@repo/business/shared/enum';

import { Base } from '../shared';

import { CreateAuthDto } from './dto/create-auth.dto';
import { CredentialsAuthDto } from './dto/credentials-auth.dto';

import { User } from './users/user.entity';

import { UserService } from './users/users.service';

@Injectable()
export class AuthService extends Base {
  constructor(
    protected userService: UserService,
    protected jwtService: JwtService,
  ) {
    super();
  }

  async signUp(createAuthDto: CreateAuthDto) {
    await this.userService.create(createAuthDto);
    return { message: 'Registration Completed Successfully!' };
  }

  async signIn(CredentialsAuthDto: CredentialsAuthDto) {
    return await this.userService
      .checkCredentials(CredentialsAuthDto)
      .then((response) => {
        const jwtPayload = { id: response.id };

        const token = this.jwtService.sign(jwtPayload);

        return { message: 'Authentication Successfully!', token };
      });
  }

  async findOne(id: string, user: User) {
    this.validateCurrentUser(id, user);
    const withDeleted = user.role === ERole.ADMIN;
    const currentUser = await this.userService.findOne(id, withDeleted);
    return this.clean(currentUser);
  }

  async me(user: User) {
    return this.clean(user);
  }

  private validateCurrentUser(id: string, user: User) {
    if (id !== user.id && user.role !== ERole.ADMIN) {
      throw new UnprocessableEntityException(
        'You are not authorized to access this feature',
      );
    }
  }

  private clean(user: User) {
    return Promise.resolve({
      id: user.id,
      cpf: user.cpf,
      role: user.role,
      name: user.name,
      email: user.email,
      status: user.status,
      gender: user.gender,
      whatsapp: user.whatsapp,
      date_of_birth: user.date_of_birth,
      created_at: user.created_at,
      updated_at: user.updated_at,
      ...(user.deleted_at && { deleted_at: user.deleted_at }),
    });
  }
}

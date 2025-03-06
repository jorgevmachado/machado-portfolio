import {ForbiddenException, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

import {ERole} from '@repo/business/shared/enum';

import AuthBusiness from '@repo/business/auth/authBusiness';
import UserBusiness from '@repo/business/auth/user';
import {Base} from '../shared';

import {CreateAuthDto} from './dto/create-auth.dto';
import {CredentialsAuthDto} from './dto/credentials-auth.dto';

import {User} from './users/user.entity';

import {UserService} from './users/users.service';

@Injectable()
export class AuthService extends Base {
  constructor(
    protected userService: UserService,
    protected jwtService: JwtService,
    protected authBusiness: AuthBusiness,
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
    const withDeleted = user.role === ERole.ADMIN;
    const currentUser = await this.userService.findOne({
      value: id,
      withDeleted,
    });
    return this.authBusiness.currentUser(currentUser, user);
  }

  async me(user: User) {
    return new UserBusiness({ ...user, clean: true });
  }

  async seed() {
    const currentUser = await this.userService.seed() as User;
    return new UserBusiness({ ...currentUser, clean: true });
  }

  async promoteUser(id: string, user: User) {
    if(user.role !== ERole.ADMIN) {
      throw new ForbiddenException(
          'You do not have permission to access this resource',
      );
    }
    const currentUser = await this.findOne(id, user);
    return this.userService.promoteUser(currentUser);
  }
}

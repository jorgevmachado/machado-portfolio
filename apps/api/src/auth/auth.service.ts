import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ERole } from '@repo/business/shared/enum';
import AuthBusiness from '@repo/business/auth/authBusiness';
import UserBusiness from '@repo/business/auth/user';

import { Base } from '../shared';

import { CreateAuthDto } from './dto/create-auth.dto';
import { CredentialsAuthDto } from './dto/credentials-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './users/user.entity';
import { UserService } from './users/users.service';

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
        const jwtPayload = {
          id: response.id,
          finance: { id: response?.finance?.id },
        };

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

  async update(id: string, updateAuthDto: UpdateAuthDto, authUser: User) {
    const { role, status } = updateAuthDto;
    this.authBusiness.validateCurrentUser({ role, status, authUser });
    await this.userService.update(id, updateAuthDto);
    return { message: 'Update Successfully!' };
  }

  async me(user: User) {
    const currentUser = await this.userService.findOne({
      value: user.id,
    });
    return new UserBusiness({ ...currentUser, clean: true });
  }

  async seed(withReturnSeed: boolean = true) {
    const currentUser = (await this.userService.seed()) as User;
    const user = new UserBusiness({ ...currentUser, clean: true });
    if (withReturnSeed) {
      return user;
    }
    return { message: 'Seeding Completed Successfully!' };
  }

  async promoteUser(id: string, authUser: User) {
    this.authBusiness.validateCurrentUser({ authUser });
    const currentUser = await this.findOne(id, authUser);
    return this.userService.promoteUser(currentUser);
  }

  async upload(id: string, file: Express.Multer.File, authUser: User) {
    this.authBusiness.validateCurrentUser({ id, authUser });
    await this.userService.upload(id, file);
    return {
      message: 'File uploaded successfully!',
    };
  }
}

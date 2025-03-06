import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ERole, EStatus } from '@repo/business/shared/enum';

import UserBusiness from '@repo/business/auth/user';

import { USER_FIXTURE, USER_PASSWORD } from '@repo/mock/auth/fixture';

import { Service } from '../../shared';

import type { TBy } from '../../shared/interface';

import { CreateAuthDto } from '../dto/create-auth.dto';
import { CredentialsAuthDto } from '../dto/credentials-auth.dto';

import { User } from './user.entity';

@Injectable()
export class UserService extends Service<User> {
  constructor(
    @InjectRepository(User)
    protected repository: Repository<User>,
  ) {
    super('users', [], repository);
  }

  async create({
    cpf,
    name,
    email,
    gender,
    whatsapp,
    password,
    date_of_birth,
  }: CreateAuthDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const confirmation_token = crypto.randomBytes(32).toString('hex');
    const user = new UserBusiness({
      cpf,
      salt,
      role: ERole.USER,
      name,
      email,
      gender,
      status: EStatus.ACTIVE,
      whatsapp,
      password: hashPassword,
      date_of_birth,
      confirmation_token,
    });

    await this.hasInactiveUser('cpf', user.cpf);
    await this.hasInactiveUser('email', user.email);
    await this.hasInactiveUser('whatsapp', user.whatsapp);
    return await this.save(user);
  }

  private async hasInactiveUser(by: TBy, value: string) {
    const entity = await this.findBy({
      searchParams: {
        by,
        value,
      },
      withDeleted: true,
    });

    if (entity && entity.deleted_at !== null) {
      throw new BadRequestException(
        'Inactive user, please contact administrator.',
      );
    }
  }

  async checkCredentials({ email, password }: CredentialsAuthDto) {
    const user = await this.findBy({
      searchParams: {
        by: 'email',
        value: email,
      },
    });

    if (!user || user?.status === EStatus.INACTIVE) {
      throw new UnprocessableEntityException('Inactive User');
    }

    const hash = await bcrypt.hash(password, user.salt);

    if (hash === user.password) {
      return user;
    }

    throw new UnprocessableEntityException('Invalid credentials');
  }

  async promoteUser(user: User) {

    if (user.role === ERole.ADMIN) {
      return {
        user,
        valid: false,
        message: 'The User is already admin.',
      };
    }
    user.role = ERole.ADMIN;
    const newUser = await this.save(user);
    return {
      user: newUser,
      valid: true,
      message: 'User promoted successfully!',
    };
  }

  async seed() {
    const userSeed = USER_FIXTURE;
    const currentSeed = await this.findOne({
      value: userSeed.name,
      withThrow: false,
    });

    if (currentSeed) {
      return currentSeed;
    }

    const createdUser = await this.create({
      cpf: userSeed.cpf,
      name: userSeed.name,
      email: userSeed.email,
      gender: userSeed.gender,
      whatsapp: userSeed.whatsapp,
      password: USER_PASSWORD,
      date_of_birth: userSeed.date_of_birth,
      password_confirmation: userSeed.password,
    });

    const promotedUser = await this.promoteUser(createdUser as User);
    return promotedUser?.user;
  }
}

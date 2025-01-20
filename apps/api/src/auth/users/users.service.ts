import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { mobileValidator } from '@repo/services/validator/contact/contact';

import { ERole, EStatus } from '@repo/business/shared/enum';

import { Service } from '../../shared';

import { TBy } from '../../shared/interface';

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

  async create(createAuthDto: CreateAuthDto) {
    const whatsUp = this.cleanFormatter(createAuthDto.whatsup);
    const cpf = this.cleanFormatter(createAuthDto.cpf);

    this.validateMobile(whatsUp);

    await this.hasInactiveUser('cpf', cpf);
    await this.hasInactiveUser('email', createAuthDto.email);
    await this.hasInactiveUser('whatsUp', whatsUp);

    const user = new User();
    user.cpf = cpf;
    user.salt = await bcrypt.genSalt();
    user.role = ERole.USER;
    user.name = createAuthDto.name;
    user.email = createAuthDto.email;
    user.gender = createAuthDto.gender;
    user.status = EStatus.ACTIVE;
    user.whatsup = whatsUp;
    user.password = await bcrypt.hash(createAuthDto.password, user.salt);
    user.date_of_birth = createAuthDto.date_of_birth;
    user.confirmation_token = crypto.randomBytes(32).toString('hex');
    return await this.save(user);
  }

  cleanFormatter(value: string) {
    return value
      .replace('-', ' ')
      .replaceAll('.', ' ')
      .replace('(', '')
      .replace(')', '')
      .replace(/\s/g, '')
      .trim();
  }

  validateMobile(value: string) {
    const validatorMessage = mobileValidator(value);
    if (!validatorMessage.valid) {
      throw new BadRequestException(validatorMessage.message);
    }
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

  async findOne(id: string, withDeleted?: boolean) {
    return await this.findBy({
      searchParams: {
        by: 'id',
        value: id,
      },
      withThrow: true,
      withDeleted,
      withRelations: true,
    });
  }
}
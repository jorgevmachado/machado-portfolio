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

import { USER_FIXTURE, USER_PASSWORD } from '@repo/business/auth/fixtures/auth';

import { Service } from '../../shared';

import type { TBy } from '../../shared/interface';

import { CreateAuthDto } from '../dto/create-auth.dto';
import { CredentialsAuthDto } from '../dto/credentials-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';

import { User } from './user.entity';

@Injectable()
export class UserService extends Service<User> {
  constructor(
    @InjectRepository(User)
    protected repository: Repository<User>,
  ) {
    super('users', ['finance'], repository);
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
    return (await this.save(user)) as User;
  }

  async update(
    id: string,
    { role, name, gender, status, date_of_birth }: UpdateAuthDto,
  ) {
    const currentUser = await this.findOne({ value: id });

    if (!role && !name && !gender && !status && !date_of_birth) {
      return currentUser;
    }

    currentUser.role = !role ? currentUser.role : role;
    currentUser.name = !name ? currentUser.name : name;
    currentUser.gender = !gender ? currentUser.gender : gender;
    currentUser.status = !status ? currentUser.status : status;
    currentUser.date_of_birth = !date_of_birth
      ? currentUser.date_of_birth
      : date_of_birth;

    return await this.save(currentUser);
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
    const user = await this.repository
        .createQueryBuilder(this.alias)
        .leftJoinAndSelect(`${this.alias}.finance`, 'finance')
        .leftJoinAndSelect('finance.bills', 'bills')
        .andWhere(`${this.alias}.email = :email`, { email })
        .getOne();

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
    console.info('# => Start seeding User');
    const item = USER_FIXTURE

    const currentSeed = await this.findBy({
      searchParams: {
        by: 'cpf',
        value: item.cpf,
        condition: '=',
      },
      relations: this.relations,
    });

    if (currentSeed) {
      console.info(`# => No new ${'User'.toLowerCase()} to seed`);
      return currentSeed;
    }
    const currentUser = await this.create({
      cpf: item.cpf,
      name: item.name,
      email: item.email,
      gender: item.gender,
      whatsapp: item.whatsapp,
      password: USER_PASSWORD,
      date_of_birth: item.date_of_birth,
      password_confirmation: item.password,
    });
    const promotedUser = await this.promoteUser(currentUser);
    console.info(`# => Seeded 1 new user`);
    return promotedUser?.user;
  }

  async upload(id: string, file: Express.Multer.File) {
    const currentUser = await this.findOne({ value: id });
    const path = await this.uploadFile(file, currentUser.email);
    currentUser.picture = `http://localhost:3001/uploads/${path.split('/').pop()}`;
    return await this.save(currentUser);
  }
}

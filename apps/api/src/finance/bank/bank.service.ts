import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import BankConstructor from '@repo/business/finance/bank/bank';

import { BANK_LIST_FIXTURE } from '@repo/business/finance/bank/fixtures/bank';

import { Service } from '../../shared';

import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

import { Bank } from './bank.entity';

@Injectable()
export class BankService extends Service<Bank> {
  constructor(
    @InjectRepository(Bank)
    protected repository: Repository<Bank>,
  ) {
    super('banks', [], repository);
  }

  async create({ name }: CreateBankDto) {
    const bank = new BankConstructor({ name });
    return await this.save(bank);
  }

  async update(param: string, { name }: UpdateBankDto) {
    const result = await this.findOne({ value: param, withDeleted: true });
    const bank = new BankConstructor({ ...result, name });
    return this.save(bank);
  }

  async seed(withReturnSeed: boolean = true) {
    return this.seeder.entities({
      by: 'name',
      key: 'all',
      label: 'Bank',
      seeds: BANK_LIST_FIXTURE,
      withReturnSeed,
      createdEntityFn: async (item) => item,
    });
  }
}

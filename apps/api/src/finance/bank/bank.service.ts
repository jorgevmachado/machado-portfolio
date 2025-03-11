import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import BankBusiness from '@repo/business/finance/bank/bank';

import { BANK_LIST_FIXTURE } from '@repo/mock/finance/bank/fixtures/bank';

import { Service } from '../../shared';

import { CreateBankDto } from './dto/create-bank.dto';

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
    const bank = new BankBusiness({ name });
    return await this.save(bank);
  }

  async seed(): Promise<Array<Bank>> {
    console.info('# => start bank seeding');
    const existingBanks = await this.repository.find({
      withDeleted: true,
    });

    const existingNames = new Set(existingBanks.map((bank) => bank.name));

    const banksToCreate = BANK_LIST_FIXTURE.filter(
      (bank) => !existingNames.has(bank.name),
    );

    if (banksToCreate.length === 0) {
      console.info('# => No new banks to seed');
      return existingBanks;
    }

    const createdBanks = (
        await Promise.all(banksToCreate.map(async (bank) => this.create(bank)))
    ).filter((bank): bank is Bank => !!bank);

    console.info(
        `# => Seeded ${createdBanks.length} new banks`,
    );
    return [...existingBanks, ...createdBanks];
  }
}

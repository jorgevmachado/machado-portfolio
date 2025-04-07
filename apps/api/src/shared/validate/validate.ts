import { ConflictException } from '@nestjs/common';

import { findRepeated } from '@repo/services/string/string';

import type { BasicEntity } from '../interface';
import type { ValidateListMockParams } from './interface';

export class Validate {
  mock(param: string, key: 'id' | 'name', label: string) {
    if (!param) {
      return;
    }
    console.error(`# => validate  list mock ${label}  failed!!`);
    throw new ConflictException(
      `The selected ${key} ${param} is repeated in ${label}, try another one or update this.`,
    );
  }

  listMock<T extends BasicEntity>({
    key,
    list,
    label,
  }: ValidateListMockParams<T>) {
    console.info(`# => start validate list mock ${label}`);
    const findRepeatedEntityById =
      key === 'id' || key === 'all' ? findRepeated<T>(list, 'id') : undefined;
    this.mock(findRepeatedEntityById, 'id', label);

    console.info(`# => validate list mock ${label} by id is passed!!`);
    const findRepeatedEntityByName =
      key === 'name' || key === 'all'
        ? findRepeated<T>(list, 'name')
        : undefined;
    this.mock(findRepeatedEntityByName, 'name', label);
    console.info(`# => validate list mock ${label} by name is passed!!`);
  }

  paramIsEntity<T>(value: any): value is T {
    return value !== null && value !== undefined && typeof value === 'object' && 'id' in value;
  }

  param<T>(value: string | T, label?: string) {
    if (!value) {
      throw new ConflictException(
        `The selected ${label ?? 'field'} does not exist, try another one or create one.`,
      );
    }
  }
}
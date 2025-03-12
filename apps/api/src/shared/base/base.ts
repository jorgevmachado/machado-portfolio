import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { File } from '../file';
import {ValidateListMockParams} from "./base.interface";
import {findRepeated} from "@repo/services/string/string";

export abstract class Base extends File {
  error(error: any) {
    if (error?.code === '23505') {
      throw new ConflictException(error?.detail ?? 'User already exists');
    }

    if (error?.code === '22001') {
      const message = error?.detail ?? error?.message;
      throw new ConflictException(message ?? 'Field type error');
    }

    if (!error || error?.status === 500 || error?.statusCode === 500) {
      throw new InternalServerErrorException(
        error?.message || 'Internal Server Error 2025',
      );
    }
    return error;
  }

  paramIsEntity<T>(value: any): value is T {
    return typeof value === 'object' && 'id' in value;
  }

  validateParam<T>(value: string | T, label?: string) {
    if (!value) {
      throw this.error(
        new ConflictException(
          `The selected ${label ?? 'field'} does not exist, try another one or create one.`,
        ),
      );
    }
  }

  validateListMock<T extends { id: string; name?: string; }>({ key, list, label }: ValidateListMockParams<T>) {
    console.info(`# => start validate list mock ${label}`)
    const findRepeatedEntityById = key === 'id' || key === 'all'
        ? findRepeated<T>(list, 'id')
        : undefined;
    this.validateMock(findRepeatedEntityById, 'id', label);

    console.info(`# => validate list mock ${label} by id is passed!!`)
    const findRepeatedEntityByName = key === 'name' || key === 'all'
        ? findRepeated<T>(list, 'name')
        : undefined;
    this.validateMock(findRepeatedEntityByName, 'name', label);
    console.info(`# => validate list mock ${label} by name is passed!!`)
  }

  validateMock(param: string, key: 'id' | 'name', label: string) {
    if (!param) {
      return;
    }
    console.error(`# => validate  list mock ${label}  failed!!`)
    throw this.error(
        new ConflictException(
            `The selected ${key} ${param} is repeated in ${label}, try another one or update this.`,
        ),
    );
  }
}

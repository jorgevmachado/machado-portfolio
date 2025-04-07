import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { File } from '../file';

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
}

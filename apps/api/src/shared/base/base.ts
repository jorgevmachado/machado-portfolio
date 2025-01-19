import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

export abstract class Base {
  error(error: any) {
    if (error?.code === '23505') {
      throw new ConflictException(error?.detail ?? 'User already exists');
    }

    if (error?.code === '22001') {
      const message = error?.detail ?? error?.message;
      throw new ConflictException(message ?? 'Field type error');
    }

    if (!error || error?.status === 500) {
      throw new InternalServerErrorException(
        error?.message || 'Internal Server Error',
      );
    }

    return error;
  }
}

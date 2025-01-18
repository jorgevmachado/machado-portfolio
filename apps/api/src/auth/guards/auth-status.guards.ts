import { Observable } from 'rxjs';

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthStatusGuards implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const userStatus = request.user.status;

    const requiredStatus = this.reflector.get<Array<string>>(
      'status',
      context.getHandler(),
    );

    if (!requiredStatus) {
      return true;
    }

    if (!requiredStatus.some((status) => status === userStatus)) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}

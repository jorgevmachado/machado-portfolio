import { Observable } from 'rxjs';

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthRoleGuards implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const userRole = request.user.role;

    const requiredRoles = this.reflector.get<Array<string>>(
      'role',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    if (!requiredRoles.some((role) => role === userRole)) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}

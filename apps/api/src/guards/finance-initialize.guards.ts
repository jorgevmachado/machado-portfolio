import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FinanceInitializeGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasFinance = Boolean(user.finance);

    if (!hasFinance) {
      throw new ConflictException(
        'Finance is not initialized, please start it to access this feature.',
      );
    }

    return true;
  }
}
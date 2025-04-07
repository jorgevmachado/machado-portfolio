import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FinanceBillInitializeGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const finance = user.finance;

    const hasFinance = Boolean(finance);

    if (!hasFinance) {
      throw new ConflictException(
        'Finance is not initialized, please start it to access this feature.',
      );
    }

    if (!finance.bills || !finance.bills.length) {
      throw new ConflictException(
        'No Bill has been created for this finance item. Please create one to access this feature.',
      );
    }

    return true;
  }
}
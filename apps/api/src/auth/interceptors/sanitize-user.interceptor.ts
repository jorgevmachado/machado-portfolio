import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import UserBusiness from '@repo/business/auth/user';
import { User } from '../users/user.entity';

@Injectable()
export class SanitizeUserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if(Array.isArray(data) && data.length > 0) {
          return data.map(this.sanitizeData.bind(this));
        }
        return this.sanitizeData(data);
      }),
    );
  }

  private sanitizeData(data: any) {
    if (this.isObjectPropertyUser(data)) {
      return this.sanitizePropertyUser(data);
    }
    if (this.isObjectUser(data)) {
      return this.sanitizeObjectUser(data);
    }
    return data;
  }

  private isObjectPropertyUser(data: any): boolean {
    return data && typeof data === 'object' && data.hasOwnProperty('user');
  }

  private sanitizePropertyUser(data: any) {
    const { user, ...rest } = data;
    const cleanUser = this.sanitizeObjectUser
(user);
    return { ...rest, user: cleanUser };
  }

  private isObjectUser(data: any) {
    return data && typeof data === 'object' && 'password' in data;
  }

  private sanitizeObjectUser
(data: User) {
    return new UserBusiness({ ...data, clean: true });
  }
}
import { Error, ERROR_STATUS_CODE } from '@repo/services/error/error';
import { ERole } from '../shared';

import User from './user';
import {UserConstructorParams, UserEntity, ValidateCurrentUserParams} from './interface';

export default class AuthBusiness {
  initializeUser(params?: UserConstructorParams): User {
    return new User(params);
  }
  currentUser(user: UserEntity, authUser: UserEntity): User {
    this.validateCurrentUser({ id: user.id, authUser });
    return new User({ ...user, clean: true });
  }
  validateCurrentUser({ id, role, status, validateAdmin, authUser} : ValidateCurrentUserParams) {
    const isAdmin = authUser.role === ERole.ADMIN;

    if(id && id !== authUser.id && !isAdmin) {
      this.throwUnauthorizedError();
    }

    if(role || status && !isAdmin) {
      this.throwUnauthorizedError();
    }

    if(validateAdmin && !isAdmin) {
      this.throwUnauthorizedError();
    }
  }
  private throwUnauthorizedError(): void {
    throw new Error({
      message: 'You are not authorized to access this feature',
      statusCode: ERROR_STATUS_CODE.UNAUTHORIZED_EXCEPTION,
    });
  }

}
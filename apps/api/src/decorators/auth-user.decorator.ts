import { createParamDecorator } from '@nestjs/common';

import { User } from '../auth/users/user.entity';

export const GetUserAuth = createParamDecorator(
  (_, req): User => req.args[0].user,
);

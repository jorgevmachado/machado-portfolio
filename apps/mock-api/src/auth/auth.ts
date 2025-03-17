import { Router } from 'express';

import { AUTH_TOKEN, USER_FIXTURE } from '@repo/business/auth/fixtures/auth';
import UserBusiness from '@repo/business/auth/user';

const authRouter: Router = Router();

authRouter.post('/auth/signUp', (req, res) => {
  res.json({
    message: 'Registration Completed Successfully!',
  });
});

authRouter.post('/auth/signIn', (req, res) => {
  res.json({
    message: 'Authentication Successfully!',
    token: AUTH_TOKEN,
  });
});

authRouter.get('/auth/me', (req, res) => {
  const finance = {
  ...USER_FIXTURE.finance,
        user: undefined
  }
  res.json(new UserBusiness({ ...USER_FIXTURE,
    finance
    , clean: true }));
});

authRouter.get('/auth/:id', (req, res) => {
  res.json(new UserBusiness({ ...USER_FIXTURE, finance: {
      ...USER_FIXTURE.finance,
      user: undefined
    }, clean: true }));
});

export default authRouter;
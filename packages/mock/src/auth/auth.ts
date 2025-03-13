import { Router } from 'express';
import { AUTH_TOKEN, USER_FIXTURE_WITH_FINANCE } from './fixture';

const authRouter: Router = Router();

authRouter.post('/auth/signUp', (req, res) => {
  res.json({
    message: 'Registration Completed Successfully!',
  });
});

authRouter.post('/auth/signIn', (req, res) => {
  res.json({
    token: AUTH_TOKEN,
    message: 'Authentication Successfully!',
  });
});

authRouter.get('/me', (req, res) => {
  res.json(USER_FIXTURE_WITH_FINANCE);
});

authRouter.get('/auth/:id', (req, res) => {
  res.json(USER_FIXTURE_WITH_FINANCE);
});

export default authRouter;
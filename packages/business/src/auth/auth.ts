import { Nest } from '../api';

import { SignInParams, SignUpParams, User } from './interface';

export class Auth {
  constructor(private nest: Nest) {}

  public async signUp(params: SignUpParams): Promise<string> {
    return this.nest.signUp(params).then((res) => res.message);
  }

  public async signIn(params: SignInParams): Promise<string> {
    return this.nest.signIn(params).then((res) => res.token);
  }

  public async get(id: string): Promise<User> {
    return this.nest.getUser(id);
  }
}

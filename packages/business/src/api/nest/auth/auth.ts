import type { INestModuleConfig } from '../interface';
import { NestModuleAbstract } from '../nestModuleAbstract';

import type { ISignInParams, ISignUpParams, IUser } from './interface';

export class Auth extends NestModuleAbstract<IUser, unknown, unknown> {
  constructor(nestModuleConfig: INestModuleConfig) {
    super({
      pathUrl: 'auth',
      nestModuleConfig,
    });
  }

  public async signUp(params: ISignUpParams): Promise<{ message: string }> {
    return this.post(`${this.pathUrl}/signUp`, { body: params });
  }

  public async signIn(params: ISignInParams): Promise<{ token: string }> {
    return this.post(`${this.pathUrl}/signIn`, { body: params });
  }

  public async me(): Promise<IUser> {
    return this.get(`${this.pathUrl}/me`);
  }
}
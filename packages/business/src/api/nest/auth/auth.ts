import type { INestModuleConfig } from '../interface';
import { NestModuleAbstract } from '../nestModuleAbstract';

import {ISignInParams, ISignUpParams, IUpdateUserParams, IUser} from './interface';

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

  public async updateAuth(params: IUpdateUserParams): Promise<{ message: string }> {
    return this.path(`${this.pathUrl}/update`, { body: params })
  }

  public async uploadPicture(file: File): Promise<{ message: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.path(`${this.pathUrl}/upload`, { body: formData });
  }
}
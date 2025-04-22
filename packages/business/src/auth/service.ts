import { Nest } from '../api';

import {SignInParams, SignUpParams, UpdateParams, UserEntity} from './interface';

export class AuthService {
    constructor(private nest: Nest) {}

    public async signUp(params: SignUpParams): Promise<string> {
        return this.nest.auth.signUp(params).then((res) => res.message);
    }

    public async signIn(params: SignInParams): Promise<string> {
        return this.nest.auth.signIn(params).then((res) => res.token);
    }

    public async get(id: string): Promise<UserEntity> {
        return this.nest.auth.getOne(id);
    }

    public async me(): Promise<UserEntity> {
        return this.nest.auth.me();
    }

    public async update(params: UpdateParams): Promise<string> {
        return this.nest.auth.updateAuth(params).then((res) => res.message);
    }

    public async upload(file: File): Promise<string> {
        return this.nest.auth.uploadPicture(file).then((res) => res.message);
    }
}

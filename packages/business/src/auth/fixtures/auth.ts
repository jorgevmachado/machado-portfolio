import User from '../user';

import AUTH_FIXTURE_JSON from './auth.json';

export const USER_ENTITY_FIXTURE: User = AUTH_FIXTURE_JSON as unknown as User;

export const USER_FIXTURE: User = {
    ...USER_ENTITY_FIXTURE,
    salt: undefined,
    password: undefined,
    recover_token: undefined,
    confirmation_token: undefined
};

export const AUTH_TOKEN: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgxNGIxMDQ0LTdjOWItNDM4Ny04MGIyLTZjMmJhNzRmYmYwMCIsImlhdCI6MTczNzI0MTc1OSwiZXhwIjoxNzM3MzI4MTU5fQ.DfQIqD3NQ-IFlDYIsmzZzGOgMwYSSpbWX_UTt-I2X9c';

export const USER_PASSWORD: string = '@Password1';
import { EGender, ERole, EStatus } from '../../shared';

import { User } from '../interface';

export const AUTH_TOKEN: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgxNGIxMDQ0LTdjOWItNDM4Ny04MGIyLTZjMmJhNzRmYmYwMCIsImlhdCI6MTczNzI0MTc1OSwiZXhwIjoxNzM3MzI4MTU5fQ.DfQIqD3NQ-IFlDYIsmzZzGOgMwYSSpbWX_UTt-I2X9c';

export const ENTITY_USER_PASSWORD: string = '123456';

export const ENTITY_USER_COMPLETE_FIXTURE: User = {
  id: 'eaca4c08-e62d-495a-ae1c-918199da8d52',
  cpf: '49892120450',
  salt: '$2b$10$Tq6pTLw4GKQ6yddESAdIWO',
  role: ERole.USER,
  name: 'John Doe',
  email: 'john.doe@mail.com',
  status: EStatus.ACTIVE,
  gender: EGender.MALE,
  whatsapp: '11998765432',
  password: '$2b$10$Tq6pTLw4GKQ6yddESAdIWOigeP3FRbx.H9OjNCK55c85b//PcKJ5.',
  created_at: new Date('2024-09-09'),
  deleted_at: undefined,
  updated_at: undefined,
  date_of_birth: new Date('1990-01-01'),
  recover_token: undefined,
  confirmation_token:
    '9bd0aceff9012467fce99a8c2efdfacd3a27255d87f0b516adfd5e889ad3668e',
};

export const USER_COMPLETE_FIXTURE: User = {
  id: ENTITY_USER_COMPLETE_FIXTURE.id,
  cpf: ENTITY_USER_COMPLETE_FIXTURE.cpf,
  role: ENTITY_USER_COMPLETE_FIXTURE.role,
  name: ENTITY_USER_COMPLETE_FIXTURE.name,
  email: ENTITY_USER_COMPLETE_FIXTURE.email,
  status: ENTITY_USER_COMPLETE_FIXTURE.status,
  gender: ENTITY_USER_COMPLETE_FIXTURE.gender,
  whatsapp: ENTITY_USER_COMPLETE_FIXTURE.whatsapp,
  date_of_birth: ENTITY_USER_COMPLETE_FIXTURE.date_of_birth,
  created_at: ENTITY_USER_COMPLETE_FIXTURE.created_at,
  updated_at: ENTITY_USER_COMPLETE_FIXTURE.updated_at,
  deleted_at: ENTITY_USER_COMPLETE_FIXTURE.deleted_at,
};

import type { IUser } from '@repo/business/api/nest/interface';

import { ERole, EStatus } from '@repo/business/shared/enum';

import { EGender } from '@repo/business/api/nest/enum';

export const USER_FIXTURE: IUser = {
  id: 'eaca4c08-e62d-495a-ae1c-918199da8d52',
  cpf: '49892120450',
  salt: '$2b$10$Tq6pTLw4GKQ6yddESAdIWO',
  role: ERole.USER,
  name: 'John Doe',
  email: 'john.doe@mail.com',
  status: EStatus.ACTIVE,
  gender: EGender.MALE,
  whatsup: '11998765432',
  password: '$2b$10$Tq6pTLw4GKQ6yddESAdIWOigeP3FRbx.H9OjNCK55c85b//PcKJ5.',
  created_at: new Date('2024-09-09'),
  deleted_at: undefined,
  updated_at: undefined,
  date_of_birth: new Date('1990-01-01'),
  recover_token: undefined,
  confirmation_token:
    '9bd0aceff9012467fce99a8c2efdfacd3a27255d87f0b516adfd5e889ad3668e',
};

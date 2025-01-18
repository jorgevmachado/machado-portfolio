import { beforeEach, describe, expect, it } from '@jest/globals';

import { MatchConstraint } from './match.decorator';

describe('MatchConstraint', () => {
  let matchConstraint: MatchConstraint;

  beforeEach(() => {
    matchConstraint = new MatchConstraint();
  });

  it('should return true when values match', () => {
    const obj = { password: '123456', passwordConfirmation: '123456' };
    expect(
      matchConstraint.validate(obj.passwordConfirmation, {
        constraints: ['password'],
        object: obj,
        property: 'passwordConfirmation',
        targetName: 'password',
        value: obj.passwordConfirmation,
      }),
    ).toBe(true);
  });

  it('should return false when values do not match', () => {
    const obj = { password: '123456', passwordConfirmation: '654321' };
    expect(
      matchConstraint.validate(obj.passwordConfirmation, {
        constraints: ['password'],
        object: obj,
        property: 'passwordConfirmation',
        targetName: 'password',
        value: obj.passwordConfirmation,
      }),
    ).toBe(false);
  });
});

import { beforeEach, describe, expect, it } from '@jest/globals';

import { CPFConstraint } from './cpf.decorator';

describe('CPFConstraint', () => {
  let cpfConstraint: CPFConstraint;

  beforeEach(() => {
    cpfConstraint = new CPFConstraint();
  });

  it('should return true for a valid CPF', () => {
    const validCPF = '12345678909';
    expect(cpfConstraint.validate(validCPF)).toBe(true);
  });

  it('should return false for an invalid CPF', () => {
    const invalidCPF = '12345678900';
    expect(cpfConstraint.validate(invalidCPF)).toBe(false);
  });

  it('should return false for a CPF with non-numeric characters', () => {
    const nonNumericCPF = '123.456.789-09';
    expect(cpfConstraint.validate(nonNumericCPF)).toBe(true);
  });

  it('should return false for a CPF with incorrect length', () => {
    const shortCPF = '123456789';
    const longCPF = '123456789012';
    expect(cpfConstraint.validate(shortCPF)).toBe(false);
    expect(cpfConstraint.validate(longCPF)).toBe(false);
  });

  it('should return false for a CPF with all identical digits', () => {
    const identicalDigitsCPF = '00000000000';
    expect(cpfConstraint.validate(identicalDigitsCPF)).toBe(false);
  });

  it('should return the correct default message', () => {
    expect(cpfConstraint.defaultMessage()).toBe('CPF is invalid');
  });
});

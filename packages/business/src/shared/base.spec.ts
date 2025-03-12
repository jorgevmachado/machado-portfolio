import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { extractLastNumberFromUrl } from '@repo/services/number/number';

import { Base } from './base';

jest.mock('@repo/services/number/number', () => ({
  extractLastNumberFromUrl: jest.fn(),
}));

class ConcreteBase extends Base {}

describe('Base', () => {
  let base: ConcreteBase;

  beforeEach(() => {
    jest.clearAllMocks();
    base = new ConcreteBase();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return undefined when both order and url are missing', () => {
    const result = base.ensureOrder(undefined, undefined);
    expect(result).toBe(0);
    expect(extractLastNumberFromUrl).not.toHaveBeenCalled();
  });

  it('should return the provided order if it exists', () => {
    const order = 5;
    const result = base.ensureOrder(order, 'http://example.com/somepath/42');
    expect(result).toBe(order);
  });

  it('should call extractLastNumberFromUrl when order is not provided', () => {
    const url = 'http://example.com/somepath/42';
    (extractLastNumberFromUrl as jest.Mock).mockReturnValue(42);

    const result = base.ensureOrder(undefined, url);
    expect(extractLastNumberFromUrl).toHaveBeenCalledWith(url);
    expect(result).toBe(42);
  });
});

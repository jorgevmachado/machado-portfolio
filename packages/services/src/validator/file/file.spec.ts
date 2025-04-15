import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { REQUIRED_FIELD } from '../utils';

import { imageTypeValidator } from './file';

describe('file validator methods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('imageTypeValidator', () => {
    it('should return valid when received valid image type', () => {
      const accept = 'image/*';
      expect(imageTypeValidator({ accept })).toEqual({
        valid: true,
        accept,
        message: 'Valid image type.',
      });
    });
    it('should return valid when received .png, .jpeg', () => {
      const accept = '.png,.jpeg';
      expect(imageTypeValidator({ accept })).toEqual({
        valid: true,
        accept,
        message: 'Valid image type.',
      });
    });
    it('should return invalid when received invalid image type', () => {
      expect(imageTypeValidator({ accept: 'application/pdf' })).toEqual({
        valid: false,
        message: 'Please enter a valid image type.',
      });
    });
    it('should return invalid when received in accepting a different type of image.', () => {
      expect(imageTypeValidator({ accept: '.png,.jpeg,.pdf' })).toEqual({
        valid: false,
        message: 'Please enter a valid image type.',
      });
    });
    it('should return invalid when received undefined image type', () => {
      expect(imageTypeValidator({})).toEqual(REQUIRED_FIELD);
    });
  });
});
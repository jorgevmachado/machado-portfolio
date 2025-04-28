import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { Error, ERROR_STATUS_CODE, ERROR_TYPE } from './error';

describe('error', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });
  it('should return Internal Server Error Exception when the fields is empty', () => {
    expect(new Error()).toEqual({
      statusCode: ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR_EXCEPTION,
      message: ERROR_TYPE.INTERNAL_SERVER_ERROR_EXCEPTION,
      error: ERROR_TYPE.INTERNAL_SERVER_ERROR_EXCEPTION,
    });
  });
  it('should return bad request Exception', () => {
    expect(
      new Error({
        statusCode: ERROR_STATUS_CODE.BAD_REQUEST_EXCEPTION,
      }),
    ).toEqual({
      statusCode: ERROR_STATUS_CODE.BAD_REQUEST_EXCEPTION,
      message: ERROR_TYPE.BAD_REQUEST_EXCEPTION,
      error: ERROR_TYPE.BAD_REQUEST_EXCEPTION,
    });
  });
  it('should return Unauthorized Exception', () => {
    expect(
      new Error({
        statusCode: ERROR_STATUS_CODE.UNAUTHORIZED_EXCEPTION,
      }),
    ).toEqual({
      statusCode: ERROR_STATUS_CODE.UNAUTHORIZED_EXCEPTION,
      message: ERROR_TYPE.UNAUTHORIZED_EXCEPTION,
      error: ERROR_TYPE.UNAUTHORIZED_EXCEPTION,
    });
  });
  it('should return Forbidden Exception', () => {
    expect(
      new Error({
        statusCode: ERROR_STATUS_CODE.FORBIDDEN_EXCEPTION,
      }),
    ).toEqual({
      statusCode: ERROR_STATUS_CODE.FORBIDDEN_EXCEPTION,
      message: ERROR_TYPE.FORBIDDEN_EXCEPTION,
      error: ERROR_TYPE.FORBIDDEN_EXCEPTION,
    });
  });
  it('should return Not Found Exception', () => {
    expect(
      new Error({
        statusCode: ERROR_STATUS_CODE.NOT_FOUND_EXCEPTION,
      }),
    ).toEqual({
      statusCode: ERROR_STATUS_CODE.NOT_FOUND_EXCEPTION,
      message: ERROR_TYPE.NOT_FOUND_EXCEPTION,
      error: ERROR_TYPE.NOT_FOUND_EXCEPTION,
    });
  });
  it('should return Request Timeout Exception', () => {
    expect(
      new Error({
        statusCode: ERROR_STATUS_CODE.REQUEST_TIMEOUT_EXCEPTION,
      }),
    ).toEqual({
      statusCode: ERROR_STATUS_CODE.REQUEST_TIMEOUT_EXCEPTION,
      message: ERROR_TYPE.REQUEST_TIMEOUT_EXCEPTION,
      error: ERROR_TYPE.REQUEST_TIMEOUT_EXCEPTION,
    });
  });
  it('should return Conflict Exception', () => {
    expect(
      new Error({
        statusCode: ERROR_STATUS_CODE.CONFLICT_EXCEPTION,
      }),
    ).toEqual({
      statusCode: ERROR_STATUS_CODE.CONFLICT_EXCEPTION,
      message: ERROR_TYPE.CONFLICT_EXCEPTION,
      error: ERROR_TYPE.CONFLICT_EXCEPTION,
    });
  });
  it('should return Gone Exception', () => {
    expect(
      new Error({
        statusCode: ERROR_STATUS_CODE.GONE_EXCEPTION,
      }),
    ).toEqual({
      statusCode: ERROR_STATUS_CODE.GONE_EXCEPTION,
      message: ERROR_TYPE.GONE_EXCEPTION,
      error: ERROR_TYPE.GONE_EXCEPTION,
    });
  });
  it('should return Unprocessable Entity Exception', () => {
    expect(
      new Error({
        statusCode: ERROR_STATUS_CODE.UNPROCESSABLE_ENTITY_EXCEPTION,
      }),
    ).toEqual({
      statusCode: ERROR_STATUS_CODE.UNPROCESSABLE_ENTITY_EXCEPTION,
      message: ERROR_TYPE.UNPROCESSABLE_ENTITY_EXCEPTION,
      error: ERROR_TYPE.UNPROCESSABLE_ENTITY_EXCEPTION,
    });
  });
  it('should return Internal Server Error Exception', () => {
    expect(
      new Error({
        statusCode: ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR_EXCEPTION,
      }),
    ).toEqual({
      statusCode: ERROR_STATUS_CODE.INTERNAL_SERVER_ERROR_EXCEPTION,
      message: ERROR_TYPE.INTERNAL_SERVER_ERROR_EXCEPTION,
      error: ERROR_TYPE.INTERNAL_SERVER_ERROR_EXCEPTION,
    });
  });
  it('should return Not Implemented Exception', () => {
    expect(
      new Error({
        statusCode: ERROR_STATUS_CODE.NOT_IMPLEMENTED_EXCEPTION,
      }),
    ).toEqual({
      statusCode: ERROR_STATUS_CODE.NOT_IMPLEMENTED_EXCEPTION,
      message: ERROR_TYPE.NOT_IMPLEMENTED_EXCEPTION,
      error: ERROR_TYPE.NOT_IMPLEMENTED_EXCEPTION,
    });
  });
  it('should return Gateway Timeout Exception', () => {
    expect(
      new Error({
        statusCode: ERROR_STATUS_CODE.GATEWAY_TIMEOUT_EXCEPTION,
      }),
    ).toEqual({
      statusCode: ERROR_STATUS_CODE.GATEWAY_TIMEOUT_EXCEPTION,
      message: ERROR_TYPE.GATEWAY_TIMEOUT_EXCEPTION,
      error: ERROR_TYPE.GATEWAY_TIMEOUT_EXCEPTION,
    });
  });
});
import { describe, expect, it } from '@jest/globals';

import { findEntityBy, transformObjectDateAndNulls } from './entities';

describe('findEntityBy', () => {
  const mockList = [
    { id: '1', name: 'John Doe', name_code: 'john_doe' },
    { id: '2', name: 'Jane Smith', name_code: 'jane_smith' },
    { id: '3', name: 'Alice Johnson', name_code: 'alice_johnson' },
  ];

  it('Should find an entity by ID.', () => {
    const result = findEntityBy({ key: 'id', value: '2', list: mockList });
    expect(result).toEqual({
      id: '2',
      name: 'Jane Smith',
      name_code: 'jane_smith',
    });
  });

  it('Should find an entity by name.', () => {
    const result = findEntityBy({
      key: 'name',
      value: 'Alice Johnson',
      list: mockList,
    });
    expect(result).toEqual({
      id: '3',
      name: 'Alice Johnson',
      name_code: 'alice_johnson',
    });
  });

  it('Should find an entity by name_code.', () => {
    const result = findEntityBy({
      key: 'name_code',
      value: 'alice_johnson',
      list: mockList,
    });
    expect(result).toEqual({
      id: '3',
      name: 'Alice Johnson',
      name_code: 'alice_johnson',
    });
  });

  it('Should return undefined if you cant find the ID', () => {
    const result = findEntityBy({ key: 'id', value: '99', list: mockList });
    expect(result).toBeUndefined();
  });

  it('Should return undefined if you cant find the name', () => {
    const result = findEntityBy({
      key: 'name',
      value: 'Unknown Name',
      list: mockList,
    });
    expect(result).toBeUndefined();
  });

  it('Should return undefined if you cant find the name_code', () => {
    const result = findEntityBy({
      key: 'name_code',
      value: 'Unknown Name',
      list: mockList,
    });
    expect(result).toBeUndefined();
  });

  it('Should return undefined for an empty list.', () => {
    const result = findEntityBy({ key: 'id', value: '1', list: [] });
    expect(result).toBeUndefined();
  });

  it('Should return undefined if the key does not exist in the object.', () => {
    const result = findEntityBy({
      key: 'unknownKey' as any,
      value: '1',
      list: mockList,
    });
    expect(result).toBeUndefined();
  });
});

describe('transformObjectDateAndNulls', () => {
  const receivedData = {
    id: 1,
    name: 'Example',
    created_at: '2023-10-21T12:34:56Z',
    updated_at: '2023-10-22T10:00:00Z',
    deleted_at: null,
    nested: {
      created_at: '2023-10-23T08:45:00Z',
      deleted_at: null,
      items: [
        {
          id: 1,
          created_at: '2023-10-24T12:00:00Z',
          deleted_at: null,
        },
      ],
    },
  };
  const expectedData = {
    id: 1,
    name: 'Example',
    created_at: new Date('2023-10-21T12:34:56Z'),
    updated_at: new Date('2023-10-22T10:00:00Z'),
    deleted_at: undefined,
    nested: {
      created_at: new Date('2023-10-23T08:45:00Z'),
      deleted_at: undefined,
      items: [
        {
          id: 1,
          created_at: new Date('2023-10-24T12:00:00Z'),
          deleted_at: undefined,
        },
      ],
    },
  };
  it('Should transform the object dates and nulls.', () => {
    expect(transformObjectDateAndNulls(receivedData)).toEqual(expectedData);
  });
});

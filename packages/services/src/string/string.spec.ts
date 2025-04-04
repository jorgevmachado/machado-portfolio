import { describe, expect, it } from '@jest/globals';
import {
  capitalize,
  convertSubPathUrlParams,
  extractLastItemFromUrl,
  findRepeated,
  formatUrl,
  initials,
  isUUID,
  normalize,
  separateCamelCase,
  snakeCaseToNormal,
  toCamelCase,
  toSnakeCase,
  truncateString,
  uuid,
} from './string';

describe('String functions', () => {
  describe('uuid', () => {
    it('should return uuid based on the date it receives', () => {
      expect(uuid(new Date('1990-01-01'))).toEqual(
        '00c3793f-2900-4000-8000-000000000000',
      );
    });
  });

  describe('isUUID', () => {
    it('Must validate if it is a uuid', () => {
      expect(isUUID('981553ee-e275-4f0a-8d88-5bf778ff772d')).toBeTruthy();
    });
  });

  describe('initials', () => {
    it('should return initials ignoring stop-words.', () => {
      expect(initials('Maria Clara de Souza', 3)).toBe('MCS');
      expect(initials('João da Silva', 2)).toBe('JS');
      expect(initials('Ana dos Santos', 2)).toBe('AS');
    });

    it('should return complete when initialsLength <= 0.', () => {
      expect(initials('joão da silva', 0)).toBe('João da silva');
    });

    it('should work with empty strings and return empty.', () => {
      expect(initials('', 3)).toBe('');
      expect(initials('   ', 2)).toBe('');
    });

    it('should allow customization of stop-words.', () => {
      expect(initials('João da Silva Junior', 3, ['junior'])).toBe('JDS');
      expect(initials('Pedro de Alcântara', 2, ['de', 'alcântara'])).toBe('P');
    });

    it('should calculate initials even with multiple extra spaces.', () => {
      expect(initials('  João   da   Silva   ', 2)).toBe('JS');
      expect(initials(' Pedro    de   Moraes', 2)).toBe('PM');
    });
  });

  describe('formatUrl', () => {
    const url = 'http://localhost:3000';
    it('should return formatted url when received url, path and params', () => {
      expect(formatUrl(url, 'user', { name: 'your_name' })).toEqual(
        'http://localhost:3000/user?name=your_name',
      );
    });

    it('should return formatted url when do not received params', () => {
      expect(formatUrl(url, 'user')).toEqual('http://localhost:3000/user');
    });
  });

  describe('normalize', () => {
    it('should remove accents from a string', () => {
      expect(normalize('João')).toBe('Joao');
      expect(normalize('çaêü')).toBe('caeu');
    });

    it('must remove extra spaces at the beginning and end', () => {
      expect(normalize('  João Silva  ')).toBe('Joao Silva');
    });

    it('deve normalizar múltiplos espaços entre palavras para um único espaço', () => {
      expect(normalize('João    da    Silva')).toBe('Joao da Silva');
    });

    it('should normalize multiple spaces between words to a single space', () => {
      expect(normalize('Joao da Silva')).toBe('Joao da Silva');
    });

    it('should return empty string if input is empty.', () => {
      expect(normalize('')).toBe('');
    });
  });

  describe('capitalize', () => {
    it('Must capitalize the first letter of the string', () => {
      expect(capitalize('hello')).toEqual('Hello');
    });
  });

  describe('toSnakeCase', () => {
    it('Must convert a string to snake case', () => {
      expect(toSnakeCase('snakeCase')).toEqual('snake_case');
    });

    it('Must convert a string normalize to snake case', () => {
      expect(toSnakeCase('Snake Case')).toEqual('snake_case');
    });
  });

  describe('toCamelCase', () => {
    it('Must convert a string to camel case', () => {
      expect(toCamelCase('camel_case')).toEqual('camelCase');
    });
  });

  describe('findRepeated', () => {
    const firstObject = {
      id: '10738468f-3285-4e89-9687-0a6463731374',
      name: 'first',
    };
    const listObjectId = [
      firstObject,
      { id: '698e7b69-077a-4a34-8abd-e4cc556e2afe', name: 'second' },
      { id: '442d3d56-de9c-402a-8230-bee52fbe85dc', name: 'third' },
    ];
    it('should return undefined because it does not have a repeated id', () => {
      expect(findRepeated(listObjectId, 'id')).toBeUndefined();
    });

    it('should return undefined because it does not have a repeated name', () => {
      expect(findRepeated(listObjectId, 'name')).toBeUndefined();
    });

    it('should return id because it have a repeated id', () => {
      expect(findRepeated([...listObjectId, firstObject], 'id')).toEqual(
        firstObject.id,
      );
    });

    it('should return name because it have a repeated name', () => {
      expect(findRepeated([...listObjectId, firstObject], 'name')).toEqual(
        firstObject.name,
      );
    });
  });

  describe('truncateString', () => {
    it('should truncate the string to the first 3 uppercase characters.', () => {
      expect(truncateString('Janeiro', 3)).toBe('JAN');
    });

    it('should return the string in all uppercase if the length is greater than the size of the string.', () => {
      expect(truncateString('Junho', 10)).toBe('JUNHO');
    });

    it('should return the string for the first 3 characters in uppercase and normalized without accent.', () => {
      expect(truncateString('Março', 4)).toBe('MARC');
    });

    it('should return the string for the first 3 characters in uppercase with accent.', () => {
      expect(truncateString('Março', 4, false)).toBe('MARÇ');
    });

    it('should return empty if the string is empty.', () => {
      expect(truncateString('', 5)).toBe('');
    });

    it('should return empty if length is 0.', () => {
      expect(truncateString('Julho', 0)).toBe('');
    });

    it('should work correctly with strings shorter than the length.', () => {
      expect(truncateString('Maio', 10)).toBe('MAIO');
    });
  });

  describe('separateCamelCase', () => {
    it('Must separate camel case string', () => {
      expect(separateCamelCase('helloWorld')).toEqual('hello World');
    });
  });

  describe('snakeCaseToCamelCase', () => {
    it('deve converter uma string SNAKE_CASE para formato normal', () => {
      expect(snakeCaseToNormal('BANK_SLIP')).toBe('Bank Slip');
      expect(snakeCaseToNormal('USER_ACCOUNT_DETAILS')).toBe(
        'User Account Details',
      );
      expect(snakeCaseToNormal('PAYMENT_STATUS')).toBe('Payment Status');
    });

    it('deve lidar com strings de uma palavra sem underscore', () => {
      expect(snakeCaseToNormal('BANK')).toBe('Bank');
      expect(snakeCaseToNormal('BANKING')).toBe('Banking');
    });

    it('deve retornar uma string vazia se o valor for vazio', () => {
      expect(snakeCaseToNormal('')).toBe('');
    });

    it('deve lidar com entradas lowercase (snake_case)', () => {
      expect(snakeCaseToNormal('bank_slip')).toBe('Bank Slip');
      expect(snakeCaseToNormal('user_account_details')).toBe(
        'User Account Details',
      );
      expect(snakeCaseToNormal('payment_status')).toBe('Payment Status');
    });

    it('deve ignorar múltiplos underscores consecutivos corretamente', () => {
      expect(snakeCaseToNormal('BANK__SLIP')).toBe('Bank  Slip');
      expect(snakeCaseToNormal('USER___ACCOUNT___DETAILS')).toBe(
        'User   Account   Details',
      );
    });

    it('deve lidar com espaços antes e após a entrada', () => {
      expect(snakeCaseToNormal(' BANK_SLIP ')).toBe('Bank Slip');
      expect(snakeCaseToNormal('  USER_ACCOUNT_DETAILS  ')).toBe(
        'User Account Details',
      );
    });

    it('não deve alterar strings sem underscores que já estão formatadas', () => {
      expect(snakeCaseToNormal('Bank Slip')).toBe('Bank Slip');
      expect(snakeCaseToNormal('User Account')).toBe('User Account');
    });
  });

  describe('extractLastItemFromUrl', () => {
    it('Must separate item from url', () => {
      expect(
        extractLastItemFromUrl(
          'http://localhost:9000/external/api/v2/ability/65/',
        ),
      ).toEqual('65');
    });
    it('Must return default url when dont have /', () => {
      expect(extractLastItemFromUrl('ability')).toEqual('ability');
    });
    it('Must return empty string if url is undefined', () => {
      expect(extractLastItemFromUrl()).toEqual('');
    });
  });

  describe('convertSubPathUrlParams', () => {
    const pathUrl = 'path_url';
    const subPathUrl = 'sub_path_url';
    const conectorPath = 'conector_path';
    it('should convert path without subPathUrl', () => {
      expect(convertSubPathUrlParams({ pathUrl })).toEqual(pathUrl);
    });

    it('should convert path without subPathUrl with conectorPath and isParam true', () => {
      expect(
        convertSubPathUrlParams({ pathUrl, conectorPath, isParam: true }),
      ).toEqual(`${pathUrl}/${conectorPath}`);
    });

    it('should convert path with subPathUrl', () => {
      expect(convertSubPathUrlParams({ pathUrl, subPathUrl })).toEqual(
        `${pathUrl}/${subPathUrl}`,
      );
    });

    it('should convert path with conectorPath', () => {
      expect(
        convertSubPathUrlParams({ pathUrl, subPathUrl, conectorPath }),
      ).toEqual(`${pathUrl}/${conectorPath}/${subPathUrl}`);
    });
  });
});
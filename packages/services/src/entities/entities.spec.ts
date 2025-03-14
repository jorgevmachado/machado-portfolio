import { describe, expect, it } from '@jest/globals';

import { findEntityBy } from './entities';

describe('findEntityBy', () => {
    const mockList = [
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
        { id: '3', name: 'Alice Johnson' }
    ];

    it('Deve encontrar uma entidade pelo ID', () => {
        const result = findEntityBy({ key: 'id', value: '2', list: mockList });
        expect(result).toEqual({ id: '2', name: 'Jane Smith' });
    });

    it('Deve encontrar uma entidade pelo Nome', () => {
        const result = findEntityBy({ key: 'name', value: 'Alice Johnson', list: mockList });
        expect(result).toEqual({ id: '3', name: 'Alice Johnson' });
    });

    it('Deve retornar undefined caso não encontre o ID', () => {
        const result = findEntityBy({ key: 'id', value: '99', list: mockList });
        expect(result).toBeUndefined();
    });

    it('Deve retornar undefined caso não encontre o Nome', () => {
        const result = findEntityBy({ key: 'name', value: 'Unknown Name', list: mockList });
        expect(result).toBeUndefined();
    });

    it('Deve retornar undefined para uma lista vazia', () => {
        const result = findEntityBy({ key: 'id', value: '1', list: [] });
        expect(result).toBeUndefined();
    });

    it('Deve retornar undefined se a chave não existir no objeto', () => {
        const result = findEntityBy({ key: 'unknownKey' as any, value: '1', list: mockList });
        expect(result).toBeUndefined();
    });
});

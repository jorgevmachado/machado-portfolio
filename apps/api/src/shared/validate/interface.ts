export type ValidateKey = 'id' | 'name' | 'all';

export interface ValidateListMockParams<T> {
    key: ValidateKey;
    list: Array<T>;
    label: string;
}
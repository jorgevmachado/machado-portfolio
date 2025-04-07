export interface FindEntityByParam<T> {
    key: 'id' | 'name' | 'name_code';
    list: Array<T>
    value: string;
}
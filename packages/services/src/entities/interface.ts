export interface FindEntityByParam<T> {
    key: 'id' | 'name';
    list: Array<T>
    value: string;
}
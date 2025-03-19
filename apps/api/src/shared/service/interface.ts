import {ValidateKey} from "../base/base.interface";

export type TByParam = 'name' | 'id';

export interface SeedEntitiesParams<T> {
    by: TByParam;
    key: ValidateKey;
    label: string;
    seeds: Array<T>;
    withReturnSeed: boolean;
    createdEntityFn: (entity: T) => Promise<T>;
}

export interface SeedEntityParams<T> {
    by: TByParam;
    seed: T;
    label: string;
    createdEntityFn: (entity: T) => Promise<T>;
}

export interface GetRelationParams<T> {
    key: TByParam,
    list: Array<T>,
    param: string,
    relation: string,
}
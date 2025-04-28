import type { TByParam } from '../interface';

export interface SeedEntityParams<T> {
  by: TByParam;
  seed: T;
  label: string;
  withReturnSeed?: boolean;
  createdEntityFn: (entity: T) => Promise<T>;
}

export interface GetRelationParams<T> {
  key: TByParam;
  list: Array<T>;
  param: string;
  relation: string;
}
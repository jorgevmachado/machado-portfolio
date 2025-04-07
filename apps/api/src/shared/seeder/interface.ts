import type { TByParam } from '../interface';
import type { ValidateKey } from '../validate';

export type SeedEntitiesParams<T> = {
  by: TByParam;
  key: ValidateKey;
  label: string;
  seeds: Array<T>;
  withReturnSeed: boolean;
  createdEntityFn: (entity: T) => Promise<T>;
}

export type ExecuteSeedParams<T> = {
  label: string;
  seedMethod: () => Promise<Array<T | void>>;
};
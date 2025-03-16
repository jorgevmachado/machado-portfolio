import type { MockEntity } from '../shared/interface';

export interface FinanceEntity extends MockEntity {
  type?: FinanceEntity;
  bill?: FinanceEntity;
  group?: FinanceEntity;
  supplier?: FinanceEntity;
  category?: FinanceEntity;
}
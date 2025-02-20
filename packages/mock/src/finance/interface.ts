import type { MockEntity } from '../shared/interface';

export interface FinanceEntity extends MockEntity {
  type?: FinanceEntity;
  group?: FinanceEntity;
  supplier?: FinanceEntity;
  category?: FinanceEntity;
}
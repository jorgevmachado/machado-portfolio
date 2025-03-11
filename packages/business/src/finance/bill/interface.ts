import type { IBill } from '../../api/nest/finance/bill';

export type BillEntity = IBill;

export interface BillConstructorParams
  extends Omit<BillEntity, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> {
  id?: BillEntity['id'];
  created_at?: BillEntity['created_at'];
  updated_at?: BillEntity['updated_at'];
  deleted_at?: BillEntity['deleted_at'];
}
import type {
  IBill,
  ICreateBillParams,
  IUpdateBillParams,
} from '../../api/nest/finance/bill';
import Bill from './bill';

export type BillEntity = IBill;

export interface BillConstructorParams
  extends Omit<
    BillEntity,
    'id' | 'name_code' | 'created_at' | 'updated_at' | 'deleted_at'
  > {
  id?: BillEntity['id'];
  created_at?: BillEntity['created_at'];
  updated_at?: BillEntity['updated_at'];
  deleted_at?: BillEntity['deleted_at'];
}

export type CreateBillParams = ICreateBillParams;

export type UpdateBillParams = IUpdateBillParams;

export type TList = 'type' | 'bank' | 'category';

export interface BillList {
  title: string;
  list: Array<Bill>;
  listType: TList;
}
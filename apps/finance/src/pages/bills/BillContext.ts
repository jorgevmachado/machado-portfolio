import React from 'react';

import Bank from '@repo/business/finance/bank/bank';
import BillCategory from '@repo/business/finance/bill-category';
import Bill from '@repo/business/finance/bill';
import type { BillList } from '@repo/business/finance/bill/interface';
import Supplier from "@repo/business/finance/supplier";

export type BillContextProps = {
  save: (bills: Array<Bill>) => void;
  bills: Array<Bill>;
  banks: Array<Bank>;
  reload: boolean;
  suppliers: Array<Supplier>;
  categories: Array<BillCategory>;
  handleReload: (value: boolean) => void;
  billListCategory: Array<BillList>;
  hasAllDependencies: boolean;
};

export default React.createContext<BillContextProps>({
  save: () => {},
  bills: [],
  banks: [],
  reload: false,
  suppliers: [],
  categories: [],
  handleReload: () => {},
  billListCategory: [],
  hasAllDependencies: false,
});
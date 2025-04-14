import React from 'react';

import Bank from '@repo/business/finance/bank/bank';
import BillCategory from '@repo/business/finance/bill-category';
import Bill from '@repo/business/finance/bill';
import type { BillList } from '@repo/business/finance/bill/interface';
import Supplier from "@repo/business/finance/supplier";

export type BillContextProps = {
  modal: React.ReactNode;
  bills: Array<Bill>;
  banks: Array<Bank>;
  loading: boolean;
  suppliers: Array<Supplier>;
  handleSave: (bill?: Bill, close?: () => void) => Promise<Bill | undefined>;
  categories: Array<BillCategory>;
  handleReload: (value: boolean) => void;
  handleLoading: (value: boolean) => void;
  handleOpenModal: (bill?: Bill) => void;
  billListCategory: Array<BillList>;
  hasAllDependencies: boolean;
};

export default React.createContext<BillContextProps>({
  modal: null,
  bills: [],
  banks: [],
  loading: false,
  suppliers: [],
  handleSave: async () => undefined,
  categories: [],
  handleReload: () => {},
  handleLoading: () => {},
  handleOpenModal: () => {},
  billListCategory: [],
  hasAllDependencies: false,
});
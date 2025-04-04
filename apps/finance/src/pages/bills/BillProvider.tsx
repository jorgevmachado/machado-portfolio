import React, { useEffect, useState } from 'react';

import type { BillList } from '@repo/business/finance/bill/interface';
import Bill from '@repo/business/finance/bill';
import Bank from '@repo/business/finance/bank/bank';
import Supplier from "@repo/business/finance/supplier/supplier";
import BillCategory from '@repo/business/finance/bill-category';

import BillContext, { BillContextProps } from './BillContext';

import { bankService, billBusiness, billCategoryService, supplierService } from '../../shared';


type BillProviderProps = {
  children: React.ReactNode;
};

export default function BillProvider({ children }: BillProviderProps) {
  const [banks, setBanks] = useState<Array<Bank>>([]);
  const [categories, setCategories] = useState<Array<BillCategory>>([]);
  const [suppliers, setSuppliers] = useState<Array<Supplier>>([]);
  const [bills, setBills] = useState<Array<Bill>>([]);
  const [billListCategory, setBillListCategory] = useState<Array<BillList>>([]);
  const [hasAllDependencies, setHasAllDependencies] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  const fetchBanks = () => {
    if (banks.length === 0) {
      bankService
        .getAll({})
        .then((response) => setBanks(response as Array<Bank>))
        .catch(() => setBanks([]));
    }
  };

  const fetchCategories = () => {
    if (categories.length === 0) {
      billCategoryService
        .getAll({})
        .then((response) => setCategories(response as Array<BillCategory>))
        .catch(() => setCategories([]));
    }
  };

  const fetchSuppliers = () => {
    if(suppliers.length === 0) {
      supplierService
        .getAll({})
        .then((response) => setSuppliers(response as Array<Supplier>))
        .catch(() => setSuppliers([]));
    }
  };

  const initBillList = (bills: Array<Bill>) => {
    setBills(bills);
    const billListCategory = billBusiness.mapBillListByItem(bills, 'category');
    setBillListCategory(billListCategory);
  };

  useEffect(() => {
    fetchBanks();
    fetchCategories();
    fetchSuppliers();
  }, []);

  useEffect(() => {
    setHasAllDependencies(banks.length > 0 && categories.length > 0);
  }, [banks, categories]);

  const context: BillContextProps = {
    save: (bills: Array<Bill>) => initBillList(bills),
    bills,
    banks,
    reload,
    suppliers,
    categories,
    handleReload: (value: boolean) => setReload(value),
    billListCategory,
    hasAllDependencies,
  };
  return (
    <BillContext.Provider value={context}>{children}</BillContext.Provider>
  );
}